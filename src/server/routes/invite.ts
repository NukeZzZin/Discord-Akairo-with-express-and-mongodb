import express from "express";
import client from "../../index";

const router: express.Router = express.Router();

router.get("/api/v1/invite", async (request, response) => {
    return response.json({ invite: `https://discord.com/oauth2/authorize?client_id=${client.user?.id}&scope=bot&permissions=8` });
});

module.exports = router;
