export default {
  name: "debug",
  description: "Prints debug information.",
  execute: async ({ state }) => {
    console.log("State:", state);
  },
};
