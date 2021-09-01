import ExtendedClient from "./client/ExtendedClient";
import server from "./server/server";
import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const client: ExtendedClient = new ExtendedClient();

mongoose.connect(`${process.env.DATABASE_URI}`, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    console.log(chalk.bold.green(`[INFO] Connected to database`));
    if (error) return console.log(chalk.bold.red(`❌ error: ${error}`));
    server.listen(process.env.PORT || 8000, async () => {
        await console.log(chalk.bold.green(`[INFO] Server listening on port ${process.env.PORT || 8000}`));
        return client.start();
    });
});