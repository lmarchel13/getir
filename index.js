const server = require("./src/app");
const { PORT } = require("./src/config");

server.listen(PORT, () => {
  console.info(`Listening to port ${PORT}`);
});
