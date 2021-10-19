import { SlashCommandBuilder } from "@discordjs/builders";
import BetterClient from "./BetterClient";
import * as Discord from "discord.js";

export type SlashCommand = {
    builder: SlashCommandBuilder | Omit<any, "addSubcommand" | "addSubcommandGroup">,
    interaction: (client: Discord.Client | BetterClient, interaction: Discord.Interaction) => void,
    permissions?: bigint[], // Permission NEEDED for the command to work
    debug?: boolean // This indicate that it should be registered with the debug guild only
}