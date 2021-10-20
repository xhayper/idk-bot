import BetterClient from "../Base/BetterClient";
import { Event } from "../Base/Event";
import * as Discord from "discord.js";

export default {
    eventName: "ready",
    once: async (client: Discord.Client | BetterClient) => {
        if (client instanceof BetterClient) {
            await client.slashCommandManager.reload();
            await client.guilds.fetch();
            await client.registerSlashCommand(client.slashCommandManager.CommandList.filter(SlashCommand => !SlashCommand.debug));
            if (client.config.debug_guild_id) {
                try {
                    const guild = await client.guilds.fetch(client.config.debug_guild_id);
                    if (guild) await client.registerGuildSlashCommand(guild, client.slashCommandManager.CommandList.filter(SlashCommand => SlashCommand.debug));
                } catch (ignored) { }
            }
        }
        console.log(`${client.user ? client.user.tag + " is" : "I am"} ready!`);
    }
} as Event