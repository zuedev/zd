export default {
  name: "ping",
  description: "Replies with Pong!",
  execute: async ({ state }) => {
    console.log("Pong!");
  },
};
