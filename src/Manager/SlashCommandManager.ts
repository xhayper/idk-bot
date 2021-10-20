import { SlashCommand } from "../Base/SlashCommand";
import * as path from "path";
import glob from "glob";

export default class {
    CommandList: SlashCommand[];
    CommandMap: Map<string, SlashCommand>;

    constructor() {
        this.CommandList = [];
        this.CommandMap = new Map();
    }

    async reload(): Promise<void | Error> {
        this.CommandList = [];
        this.CommandMap = new Map();
        return new Promise((resolve, reject) => {
            glob(path.join(__dirname, "..\\Command\\**\\*.+(js|ts)"), (err: Error | null, matches: string[]) => {
                if (err) return reject(err);
                matches.forEach(async (filePath: string) => {
                    delete require.cache[filePath];
                    const Command: SlashCommand = (await import(filePath)).default;
                    if (!Command.builder || !Command.interaction) return;
                    if (this.CommandMap.has(Command.builder.name)) return;
                    this.CommandMap.set(Command.builder.name, Command);
                    this.CommandList.push(Command);
                });
                return resolve();
            })
        });
    }

}