import { MongoClient } from "mongodb";  
const client=new MongoClient(process.env.DATABASE_LINK);
await client.connect();
const database=client.db("KWL");
console.log("Connected to database");
export default database;
