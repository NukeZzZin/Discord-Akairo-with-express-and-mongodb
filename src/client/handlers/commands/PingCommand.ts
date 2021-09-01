import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class PingCommand extends Command {
    public constructor() {
        super("ping", {
            aliases: ["ping"],
            category: "Public",
            description: {
                content: "verifica a latência do bot",
                usage: "ping",
                examples: [
                    "ping"
                ]
            }
        });
    }
    public exec(message: Message): Promise<any> {
        return message.channel.send("Pinging...").then(_ => {
            _.edit(`A latência do bot é de ${Math.round(_.createdTimestamp - message.createdTimestamp)} ms`);
        });
    }
}