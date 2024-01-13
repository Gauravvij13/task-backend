import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MOGODB_URL}/${DB_NAME}`
    );
    console.log(`MongoDb Connected,${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(error, "Mpngodb error");
    process.exit(1);
  }
};
export default connectDB;
