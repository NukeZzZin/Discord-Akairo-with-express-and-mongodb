import express from "express";
import passport from "passport";

const router: express.Router = express.Router();

router.get("/api/v1/oauth2/auth", passport.authenticate("discord", { scope: ["guilds", "identify", "email"] }));

router.get("/api/v1/oauth2/auth/callback", passport.authenticate("discord", { failureRedirect: "/" }), (request, response) => response.redirect("/"));

module.exports = router;

