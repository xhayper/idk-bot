import BetterClient from "../Base/BetterClient";
import { Event } from "../Base/Event";
import * as Discord from "discord.js";
import * as path from "path";
import glob from "glob";

export default class {

    client: Discord.Client | BetterClient;

    constructor(client: Discord.Client | BetterClient) {
        this.client = client
    }

    async reload(): Promise<void | Error> {
        /* @ts-ignore */
        this.client.removeAllListeners();
        return new Promise((resolve, reject) => {
            glob(path.join(__dirname, "..\\Event\\**\\*.+(js|ts)"), (err: Error | null, matches: string[]) => {
                if (err) return reject(err);
                matches.forEach(async (filePath: string) => {
                    delete require.cache[filePath];
                    const event: Event = (await import(filePath)).default;
                    if (!event.eventName) return;
                    /*
                        // @ts-ignore
                        if (event.on) this.client.on(event.eventName, (...args: any[]) => event.on(this.client, ...args));
                        // @ts-ignore
                        if (event.off) this.client.off(event.eventName, (...args: any[]) => event.off(this.client, ...args));
                        // @ts-ignore
                        if (event.once) this.client.once(event.eventName, (...args: any[]) => event.once(this.client, ...args));
                        ^ Stored incase the one below broke ^
                    */
                    ["on", "off", "once"].forEach(functionName => {
                        // @ts-ignore
                        if (event[functionName] && typeof (event[functionName]) == "function") this.client[functionName](event.eventName, (...args: any[]) => event[functionName](this.client, ...args));
                    });
                });
                return resolve();
            })
        });
    }

}