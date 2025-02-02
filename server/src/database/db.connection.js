/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
import mongoose from "mongoose";

class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connection established with DB.");
    } catch (error) {
      console.log('error: ', error);
      process.exit(1); // Optionally exit if critical
    }
  }
}

let dbInstance;

const getDbInstance = () => {
  if (!dbInstance) {
    dbInstance = new Database();
  }
  return dbInstance;
};

export default getDbInstance();
