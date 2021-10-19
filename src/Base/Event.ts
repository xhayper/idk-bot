import BetterClient from "./BetterClient";
import * as Discord from "discord.js";

export type Event = {
    eventName: keyof Discord.ClientEvents,
    on?: (client: Discord.Client | BetterClient, ...args: any[]) => void,
    off?: (client: Discord.Client | BetterClient, ...args: any[]) => void,
    once?: (client: Discord.Client | BetterClient, ...args: any[]) => void
}