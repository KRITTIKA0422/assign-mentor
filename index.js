import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import {studentRouter} from "./routes/UserRoutes.js";
import {mentorRouter} from "./routes/UserRoutes.js";
import {mentorstuRouter} from "./routes/UserRoutes.js";
import cors from "cors";
dotenv.config();
console.log(process.env.MONGO_URL);
const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
app.use(express.json());
const MONGO_URL = process.env.MONGO_URL;
async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
}
export const client = await createConnection();
app.get("/", function (request, response) {     //api endpoint for viewing welcome to assign mentor
    response.send("Welcome to assign mentor");
});

app.use('/student', studentRouter)
app.use('/mentor',mentorRouter)
app.use('/mentors',mentorstuRouter)
app.listen(PORT, () => console.log(`App started in ${PORT}`));
