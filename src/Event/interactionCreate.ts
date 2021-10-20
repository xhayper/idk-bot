import BetterClient from "../Base/BetterClient";
import { Event } from "../Base/Event";
import * as Discord from "discord.js";

export default {
    eventName: "interactionCreate",
    on: async (client: Discord.Client | BetterClient, interaction: Discord.Interaction) => {
        if (interaction.isCommand()) {
            if (client instanceof BetterClient && client.slashCommandManager.CommandMap.has(interaction.commandName)) {
                const SlashCommand = client.slashCommandManager.CommandMap.get(interaction.commandName)!;
                // Permission Check
                if (SlashCommand.permissions) {
                    if (!interaction.guild) return interaction.reply("You need to run this command in a guild text channel!");
                    if (interaction.user.id != interaction.guild.ownerId && (!interaction.memberPermissions || !interaction.memberPermissions.has(SlashCommand.permissions))) {
                        return interaction.reply(`You don't have permission to this run command!\nMissing Permission: ${(interaction.memberPermissions ? interaction.memberPermissions.missing(SlashCommand.permissions) : new Discord.Permissions().add(SlashCommand.permissions).toArray()).join(", ")}`);
                    } else {
                        const guildMember = await interaction.guild.members.fetch(client.user!.id);
                        if (!guildMember) return interaction.reply("I am not in this guild! (Is this an error? will this ever happened?)");
                        if (!guildMember.permissions.has(SlashCommand.permissions)) return interaction.reply(`I don't have permission to run this command!\nMissing Permission: ${guildMember.permissions.missing(SlashCommand.permissions).join(", ")}`);
                    }
                }
                SlashCommand.interaction(client, interaction);
            }
        }
    }
} as Event