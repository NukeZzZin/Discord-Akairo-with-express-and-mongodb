import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class PingCommand extends Command {
    public constructor() {
        super("ping", {
            aliases: ["ping"],
            category: "Public",
        });
    }
    public async exec(message: Message): Promise<Message | Message[]> {
        return message.channel.send("Pinging...").then(_ => _.edit({ content: "\n" , embeds: [new MessageEmbed()
            .setDescription([
                `🔂 **RTT**: ${Number(_.editedAt || _.createdAt) - Number(message.editedAt || message.createdAt)}ms`,
                `💟 **API Latency**: ${this.client.ws.ping}ms`
            ].join("\n"))
            .setColor("RANDOM")
            .setTimestamp(Date.now())]
        }));
    }
}