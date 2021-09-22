import express from "express";

const router: express.Router = express.Router();

router.get("/", async (request, response) => {
    // if (!request.user) return response.json({ ERROR: "authentication failure" });
    return response.json({ _: request.user });
});

module.exports = router;
