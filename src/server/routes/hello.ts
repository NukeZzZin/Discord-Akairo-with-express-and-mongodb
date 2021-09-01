import express from "express";

const router: express.Router = express.Router();

router.all("/api/v1/hello_world", (request, response) => {
    return response.send(`Hello World!`)
});

module.exports = router;
