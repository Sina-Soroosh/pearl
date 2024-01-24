import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    }

    await mongoose.connect("mongodb://localhost:27017/pearl");
    console.log("Connect to db is successfully!!");
    return true;
  } catch (error) {
    console.log("Connect to db is has error !!");
    return false;
  }
};

export { connectToDB };
