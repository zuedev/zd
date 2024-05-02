import { dalle } from "#controllers/openai.js";
import chalk from "chalk";
import open from "open";

export default {
  name: "dalle",
  description: "Generate images with DALL-E 3",
  execute: async ({ state }) => {
    const { status, url } = await dalle({
      prompt: state.arguments.join(" "),
    });

    if (status !== 200) {
      console.log(chalk.red("Error: DALL-E failed."));
      process.exit(1);
    }

    const output = chalk.green(`${chalk.bold("Opening DALL-E image:")} ${url}`);

    console.log(output);

    await open(url);

    process.exit(0);
  },
};
