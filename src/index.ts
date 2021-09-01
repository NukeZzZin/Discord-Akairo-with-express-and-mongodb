import ExtendedClient from "./client/ExtendedClient";
import server from "./server/server";
import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv";
import logger from "./utils/logger";

dotenv.config();

const client: ExtendedClient = new ExtendedClient();

mongoose.connect(`${process.env.DATABASE_URI}`, { useNewUrlParser: true, useUnifiedTopology: true }, async (error) => {
    await logger.sucess("Connected to database.");
    if (error) return logger.error("unable to connect to database.");
    return server.listen(process.env.PORT || 8000, async () => {
        await logger.sucess(`server running in http://localhost:${process.env.PORT || 8000}`);
        return client.start();
    });
});