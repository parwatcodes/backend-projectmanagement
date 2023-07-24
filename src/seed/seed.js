import mongoose from "mongoose";

import data from './data.json' assert {type: "json"};

class Seed {
  static async insertData() {
    try {

      let users = await this.insertUsers();
      let projects = await this.insertProjects();
      console.info("Seeding completed...");
    } catch (error) {
      console.error('Error seeding data', error);
    }
  }

  static async insertUsers() {
    let collectionName = 'users';

    return await mongoose.connection.collection(collectionName).insertMany(data.users);
  }

  static async insertProjects() {
    let collectionName = 'projects';

    return await mongoose.connection.collection(collectionName).insertMany(data.projects);
  }
}

export default Seed;
