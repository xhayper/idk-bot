import BetterClient from "./BetterClient";
import * as Discord from "discord.js";

type EventFunction = (client: Discord.Client | BetterClient, ...args: any[]) => void

export type Event = {
    eventName: keyof Discord.ClientEvents,
    on?: EventFunction,
    off?: EventFunction,
    once?: EventFunction
}