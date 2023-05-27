import mongoose from "mongoose";

const dbURL: string | undefined = process.env.DB_URL;

const dbConnection = async () => {
  if (!dbURL) {
    console.log("DB url not found.");
    return;
  }
  await mongoose.connect(dbURL);
  console.log("Successfully databse connected.");
};

export default dbConnection;
