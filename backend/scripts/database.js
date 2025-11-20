import mongoose from "mongoose";
mongoose.connect(process.env.DATABASE_LINK);
console.log("Connected to database");
export default mongoose;