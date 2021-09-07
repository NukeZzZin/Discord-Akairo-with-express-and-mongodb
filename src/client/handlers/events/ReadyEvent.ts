import { Listener } from "discord-akairo";

export default class ReadyEvent extends Listener {
    public constructor() {
        super("ReadyEvent", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
    }
    public async exec(): Promise<void> {
        this.client.logger.sucess("Discord-akairo has been initialized.");
        this.client.user?.setPresence({ activities: [{ name: "https://github.com/NukeZzZin" }], status: "dnd" });
    }
}
