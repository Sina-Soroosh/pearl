import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const uri =
  "mongodb://root:RQIWwklncXhknnYVTabjZ91F@taftan.liara.cloud:33515/my-app?authSource=admin";

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
