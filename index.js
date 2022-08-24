import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGO_URL);
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
const MONGO_URL = process.env.MONGO_URL;
async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
}
const client = await createConnection();
app.get("/", function (request, response) {     //api endpoint for viewing welcome to hall booking
    response.send("Welcome to hall booking");
});
app.listen(PORT, () => console.log(`App started in ${PORT}`));