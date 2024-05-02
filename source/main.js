#!/usr/bin/env node
import "dotenv/config";
import chalk from "chalk";

const state = {};

const expectedEnvironmentVariables = ["ZDCLI_OPENAI_API_KEY"];

expectedEnvironmentVariables.forEach((variable) => {
  if (!process.env[variable]) {
    console.log(chalk.red(`Error: Missing environment variable: ${variable}`));
    process.exit(1);
  }
});

const input = process.argv.slice(2);

state.command = input[0];

if (!state.command) {
  console.log(chalk.red("Error: Missing command."));
  console.log(chalk.yellow("Usage: zd <command:subcommand> [arguments]"));
  process.exit(1);
}

if (state.command.includes(":")) {
  const [command, subcommand] = state.command.split(":");
  state.command = command;
  state.subcommand = subcommand;
} else {
  state.subcommand = null;
}

state.arguments = input.slice(1).length > 0 ? input.slice(1) : null;

try {
  const commandPath = !state.subcommand
    ? `./commands/${state.command}.js`
    : `./commands/${state.command}/${state.subcommand}.js`;

  (await import(commandPath)).default.execute({ state });
} catch (error) {
  console.log(chalk.red("Error: Command not found."));
  process.exit(1);
}
