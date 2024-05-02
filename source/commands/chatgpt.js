import { chatgpt } from "#controllers/openai.js";
import chalk from "chalk";
import boxen from "boxen";

export default {
  name: "chatgpt",
  description: "Chat with GPT-4",
  execute: async ({ state }) => {
    const { status, response } = await chatgpt({
      prompt: state.arguments.join(" "),
    });

    if (status !== 200) {
      console.log(chalk.red("Error: ChatGPT failed."));
      process.exit(1);
    }

    const output = chalk.green(
      boxen(response, {
        title: "ChatGPT (GPT-4)",
        titleAlignment: "center",
        padding: 1,
        margin: 1,
      })
    );

    console.log(output);

    process.exit(0);
  },
};
