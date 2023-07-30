import mongoose from "mongoose";
import cors from 'cors';
import express from 'express';

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
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    new Route(app);
  }

  async initializeDatabase() {
    try {
      await mongoose.connect(mongoDBUrl, { useNewUrlParser: true });

      console.info('Connected to mongo database ✅');
    } catch (error) {
      console.error("Error connecting database: ", error);
    }
  }
}
