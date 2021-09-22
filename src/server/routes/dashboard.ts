import express from "express";

const router: express.Router = express.Router();

router.get("/dashboard", async (request, response) => {
    return response.json({ _: request.user });
});

module.exports = router;
