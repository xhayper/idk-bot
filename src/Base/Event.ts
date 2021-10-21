import BetterClient from "./BetterClient";
import * as Discord from "discord.js";

type EventListener = (client: Discord.Client | BetterClient, ...args: any[]) => void

export type Event = {
    eventName: keyof Discord.ClientEvents,
    on?: EventListener,
    off?: EventListener,
    once?: EventListener
}