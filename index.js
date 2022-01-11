const app = require("./src/app");
const http = require("http");
const { PORT } = require("./src/config");
const { initDatabaseConnection } = require("./src/models");

const startServer = () => {
  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.info(`Listening to port ${PORT}`);
  });
};

initDatabaseConnection(startServer);
