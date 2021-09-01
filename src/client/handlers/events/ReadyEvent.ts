import chalk from "chalk";
import { Listener } from "discord-akairo";

export default class ReadyEvent extends Listener {
    public constructor() {
        super("ReadyEvent", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
    }
    public async exec(): Promise<any> {
        console.log(chalk.bold.green(`[INFO] Discord-akairo has been initialized`));
        this.client.user?.setPresence({ activity: { name: "https://github.com/NukeZzZin", type: 4 } });
    }
}