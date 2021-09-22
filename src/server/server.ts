import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy } from "passport-discord";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import User from "../models/User";

const app = express();

dotenv.config();
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ inflate: true, limit: 1024000 }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ 
    secret: String(process.env.SESSION_SECRET), 
    cookie: { secure: true },
    resave: false, 
    saveUninitialized: false, 
    store: MongoStore.create({ mongoUrl: String(process.env.DATABASE_URI) }) 
}));
app.use(passport.initialize());
app.use(passport.session());

for(const routes of fs.readdirSync(path.resolve(__dirname, "./routes/")).filter(routes => routes.endsWith(".ts"))) {
    app.use(require(path.resolve(__dirname, `./routes/${routes}`)));
}

// * BEGINNING OF OAUTH DISCORD * //

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser<any, any>(async(id, done) => {
    const CurrentUser = await User.findById(id);
    if (CurrentUser) { 
        done(null, CurrentUser) 
    } else {
        done(null);
    }
});

passport.use(new Strategy({
    clientID: String(process.env.DISCORD_ID),
    clientSecret: String(process.env.DISCORD_SECRET),
    callbackURL: String(process.env.DISCORD_ENDPOINT),
    scope: ["guilds", "identify", "email"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const Template = { 
            Id: Number(profile.id),
            Username: String(profile.username),
            Avatar: String(profile.avatar),
            Discriminator: Number(profile.discriminator),
            Flags: Number(profile.flags),
            Email: String(profile.email),
            Locale: String(profile.locale),
            Verified: Boolean(profile.verified),
            Mfa_Enabled: Boolean(profile.mfa_enabled),
            Provider: String(profile.provider),
            Guilds: profile.guilds,
            RefreshToken: String(refreshToken),
            AccessToken: String(accessToken)
        };
        const CurrentUser = await User.findOne({ Id: Number(profile.id) });
        if (CurrentUser) {
            await CurrentUser.updateOne(Template);
            return done(null, CurrentUser)
        } else if (!CurrentUser) {
            const NowUser = await (await User.create(Template)).save();
            return done(null, NowUser);
        }
    } catch(err) {
        return done(null, profile);
    }
}));

// * END OF OAUTH DISCORD * //

export default app;