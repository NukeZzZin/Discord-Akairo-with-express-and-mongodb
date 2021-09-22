import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { Intents } from "discord.js";
import path from "path";
import Logger from "../utils/logger";
import ExtendedClietInterface from "./interfaces/ExtendedCliet";
import "dotenv/config";

declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
        inhibitorHandler: InhibitorHandler;
        conifg: ExtendedClietInterface;
        logger: typeof Logger;
    }
}

export default class ExtendedCliet extends AkairoClient {
    public config: ExtendedClietInterface;
    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: path.join(__dirname, "./handlers/events"),
    });
    
    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: path.join(__dirname, "./handlers/commands"),
        prefix: "L!",
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        blockBots: true,
        commandUtilLifetime: 3e5,
    });

    public constructor(conifg: ExtendedClietInterface) {
        super({ ownerID: conifg.owners }, {
            messageCacheLifetime: 3600,
            shardCount: 2,
            intents: new Intents(32767) 
        });
        this.logger = Logger;
        this.config = conifg;
    }

    private async _init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process: process,
        });
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }

    public async start(): Promise<string> {
        await this._init();
        return this.login(process.env.DISCORD_TOKEN);
    }
}