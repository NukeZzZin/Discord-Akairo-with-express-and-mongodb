import express from "express";

const router: express.Router = express.Router();

router.all("/api/v1/test/:misc", async (request, response) => {
    response.send(`Test : ${request.params.misc}`);
});

module.exports = router;
