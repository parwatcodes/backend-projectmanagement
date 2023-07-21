import mongoose from "mongoose";

import Route from './src/route/index.js';
import { mongoDBUrl } from './src/constants.js';

export default class ServerConfig {
  constructor(app) {

    this.configureMiddleware(app);
    this.initializeDatabase();
  }

  configureMiddleware(app) {
    new Route(app);
  }

  async initializeDatabase() {
    try {
      await mongoose.connect(mongoDBUrl, { useNewUrlParser: true });

      console.info('Connected to mongo database ✅')
    } catch (error) {
      console.error("Error connecting database: ", error);
    }
  }
}
