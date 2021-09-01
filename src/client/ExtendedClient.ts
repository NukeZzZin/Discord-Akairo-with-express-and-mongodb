import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { Message } from "discord.js"
import { join } from "path";
import dotenv from "dotenv";

dotenv.config();

declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
        inhibitorHandler: InhibitorHandler
    }
}

export default class ExtendedCliet extends AkairoClient {
    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "./handlers/events"),
    });

    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "./handlers/commands"),
        prefix: "L!",
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        argumentDefaults: {
            prompt: {
                modifyStart: (message: Message) => {message.channel.send(`${message.author}, Aperte no \`✅\` para cancelar seu comando!`).then(msg =>  {msg.react('✅'); msg.delete({ timeout: 15e3 })})},
                modifyRetry: (message: Message) => {message.channel.send(`${message.author}, Aperte no \`✅\` para cancelar seu comando!`).then(msg =>  {msg.react('✅'); msg.delete({ timeout: 15e3 })})},
                timeout: (message: Message) => {message.channel.send(`Você demorou muito por isso seu comando foi cancelado.`).then(msg => msg.delete({ timeout: 15e3 }))},
                ended: (message: Message) => {message.channel.send(`Você tentou muitas vezes por isso seu comando foi cancelado.`).then(msg => msg.delete({ timeout: 15e3 }))},
                cancel: (message: Message) => {message.channel.send(`Seu comando foi cancelado...`).then(msg => msg.delete({ timeout: 15e3 }))},
            },
            otherwise: ""
        },
    });

    private async _init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process,
        });
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }

    public async start(): Promise<string> {
        await this._init();
        return this.login(process.env.DISCORD_TOKEN);
    }
}