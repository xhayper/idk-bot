import * as Discord from "discord.js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "../") + "\\.env" });

if (!process.env.DISCORD_TOKEN) process.exit(-1);

const manager = new Discord.ShardingManager(path.join(__dirname, "./Index.js"), { token: process.env.DISCORD_TOKEN });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();