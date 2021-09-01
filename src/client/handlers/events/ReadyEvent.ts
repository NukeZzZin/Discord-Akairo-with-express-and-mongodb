import chalk from "chalk";
import { Listener } from "discord-akairo";
import logger from "../../../utils/logger"

export default class ReadyEvent extends Listener {
    public constructor() {
        super("ReadyEvent", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
    }
    public async exec(): Promise<any> {
        logger.sucess("Discord-akairo has been initialized.");
        this.client.user?.setPresence({ activity: { name: "https://github.com/NukeZzZin", type: 4 }, status: "dnd" });
    }
}