import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand } from "../Base/SlashCommand";
import BetterClient from "../Base/BetterClient";
import * as Discord from "discord.js";

export default {
    builder: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user from the server")
        .addUserOption(userOption => userOption.setName("target").setDescription("Person to ban").setRequired(true))
        .addStringOption(stringOption => stringOption.setName("reason").setDescription("Reason for the ban"))
        .addNumberOption(numberOption => numberOption.setName("duration").setDescription("Duration of the ban (Days)")),
    interaction: async (client: Discord.Client | BetterClient, interaction: Discord.Interaction) => {
        if (!interaction.isCommand()) return;
        await interaction.deferReply();
        if (!interaction.guild) return interaction.editReply({ content: "This command can only be used in guild!" });
        const bot = await interaction.guild.members.fetch(client.user!.id);
        const sender = await interaction.guild.members.fetch(interaction.user.id);
        if (!bot || !sender) return interaction.editReply({ content: "This isn't possible...? Either the bot/you isn't in the guild... this shouldn't appear..." });
        const target = interaction.options.getUser("target")!;
        const reason = interaction.options.getString("reason");
        const duration = interaction.options.getNumber("duration");
        const guildTarget = await interaction.guild.members.fetch(target.id);
        if (!guildTarget) return interaction.editReply({ content: "Can't find that member in the guild!" });
        if (sender.id == target.id) return interaction.editReply({ content: "Hey! You can't ban yourself!" });
        if (bot.id == target.id) return interaction.editReply({ content: "Hey! Why are you banning me?!" });
        if (guildTarget.roles.highest.position > bot.roles.highest.position) return interaction.editReply({ content: "The target have higher role than me!" });
        if (guildTarget.roles.highest.position > sender.roles.highest.position && sender.id != interaction.guild.ownerId) return interaction.editReply({ content: "You can't ban a person who have a higher role than you!" });
        await guildTarget.ban({
            days: duration || 0,
            reason: `${reason || "Unknown"}\nBanned by ${interaction.user.tag}`
        });
        await interaction.editReply({ content: "Done!" });
    },
    permissions: [Discord.Permissions.FLAGS.BAN_MEMBERS]
} as SlashCommand