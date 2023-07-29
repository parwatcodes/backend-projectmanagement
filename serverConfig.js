import mongoose from "mongoose";
import cors from 'cors';

import Route from './src/route/index.js';
import { mongoDBUrl } from './src/constants.js';
import Seed from "./src/seed/seed.js";

export default class ServerConfig {
  constructor(app) {

    this.configureMiddleware(app);
    this.initializeDatabase();

    // Seed.insertData();
  }

  configureMiddleware(app) {
    app.use(cors());
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
