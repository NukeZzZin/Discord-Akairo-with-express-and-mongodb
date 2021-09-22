import express from "express";
import passport from "passport";

const router: express.Router = express.Router();

router.get("/api/v1/oauth2/auth", passport.authenticate("discord", { scope: ["guilds", "identify", "email"] })); // https://discord.com/api/oauth2/authorize?client_id=870093175862226955&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fapi%2Fv1%2Foauth2%2Fauth%2Fcallback&response_type=code&scope=identify%20email%20guilds

router.get("/api/v1/oauth2/auth/callback", passport.authenticate("discord", { failureRedirect: "/" }), (request, response) => response.redirect("/dashboard"));

module.exports = router;

