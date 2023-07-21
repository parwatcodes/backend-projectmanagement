import express from "express";

import { PORT } from './src/constants.js';
import ServerConfig from "./serverConfig.js";

const app = express();

new ServerConfig(app);

app.listen(PORT, '127.0.0.1', function (err) {
  if (err) {
    return console.err("Error: ", err);
  }

  console.log(`Server running on: http://127.0.0.1:${PORT}`);
});
