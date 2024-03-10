import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const uri =
  "mongodb://root:oXv2PT4EfGUp8vo3uRfBaDSd@chogolisa.liara.cloud:33114/my-app?authSource=admin";

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    }

    await mongoose.connect(uri);
    console.log("Connect to db is successfully!!");
    return true;
  } catch (error) {
    console.log("Connect to db is has error !!", error);
    return false;
  }
};

export { connectToDB };
