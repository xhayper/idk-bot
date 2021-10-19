import SlashCommandManager from "../Manager/SlashCommandManager";
import EventManager from "../Manager/EventManager";
import { SlashCommand } from "./SlashCommand";
import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";
import * as Discord from "discord.js";
import { Config } from "./Config";
import * as path from "path";

export default class extends Discord.Client {

    slashCommandManager: SlashCommandManager;
    eventManager: EventManager;
    config: Config;

    constructor(options: Discord.ClientOptions) {
        super(options);
        this.eventManager = new EventManager(this);
        this.slashCommandManager = new SlashCommandManager();
        this.config = require(path.join(__dirname, "..\\..\\config.json")) || {}
    }

    registerSlashCommand(CommandList?: SlashCommand | SlashCommand[]) {
        if (!this.token || !this.user) return;
        if (!CommandList) CommandList = this.slashCommandManager.CommandList;
        if (!Array.isArray(CommandList)) CommandList = [CommandList];
        if (0 >= CommandList.length) return;
        return new REST({ version: '9' }).setToken(this.token).put(
            Routes.applicationCommands(this.user.id),
            { body: CommandList.map((SlashCommand) => SlashCommand.builder.toJSON()) },
        );
    }

    registerGuildSlashCommand(resolvable: Discord.GuildResolvable, CommandList?: SlashCommand | SlashCommand[]) {
        if (!this.token || !this.user) return;
        const guild = this.guilds.resolve(resolvable);
        if (!guild) return;
        if (!CommandList) CommandList = this.slashCommandManager.CommandList;
        if (!Array.isArray(CommandList)) CommandList = [CommandList];
        if (0 >= CommandList.length) return;
        return new REST({ version: '9' }).setToken(this.token).put(
            Routes.applicationGuildCommands(this.user.id, guild.id),
            { body: CommandList.map((SlashCommand) => SlashCommand.builder.toJSON()) },
        );
    }
}