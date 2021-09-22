import ExtendedClient from "./client/ExtendedClient";
import server from "./server/server";
import mongoose from "mongoose";
import Logger from "./utils/logger";

import "dotenv/config";

const client: ExtendedClient = new ExtendedClient({ owners: process.env.DISCORD_OWNERS, token: process.env.DISCORD_TOKEN });

mongoose.connect(`${process.env.DATABASE_URI}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, async (error) => {
    await Logger.sucess("Connected to database.");
    if (error) return Logger.error("unable to connect to database.");
    return server.listen(process.env.PORT || 8000, async () => {
        await Logger.sucess(`server running in http://localhost:${process.env.PORT || 8000}`);
        return client.start();
    });
});

export default client;