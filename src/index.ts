import BetterClient from "./Base/BetterClient";
import * as Discord from "discord.js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "..\\.env") });

if (!process.env.DISCORD_TOKEN) process.exit(-1);

const client = new BetterClient({
  intents: [Discord.Intents.FLAGS.GUILDS]
});

(async () => {
  await client.eventManager.reload();
  await client.login(/*process.env.DISCORD_TOKEN*/); // discord.js automaticlly login if process.env have DISCORD_TOKEN, uncomment if it doesn't
})();