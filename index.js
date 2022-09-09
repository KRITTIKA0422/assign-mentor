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
app.get("/", function (request, response) {     //api endpoint for viewing welcome to assign mentor
    response.send("Welcome to assign mentor");
});
app.post("/student", async function (request, response) {       //api endpoint for creating students
    const data = request.body;
    console.log(data);
    const result = await client.db("assign-mentor").collection("student").insertMany(data);
    console.log(result);
    response.send(result);
});
app.get("/student", async function (request, response) {          //api endpoint for getting students
    console.log(request.query);
    const students = await client.db("assign-mentor").collection("student").find(request.query).toArray();
    response.send(students);
});
app.post("/mentor", async function (request, response) {          //api endpoint for creating mentors
    const data = request.body;
    console.log(data);
    const result = await client.db("assign-mentor").collection("mentor").insertMany(data);
    console.log(result);
    response.send(result);
});
app.get("/mentor", async function (request, response) {            //api endpoint for getting mentors
    console.log(request.query);
    const mentors = await client.db("assign-mentor").collection("mentor").find(request.query).toArray();
    response.send(mentors);
});
app.put("/mentor/:id", async function (request, response) {       //api endpoint for assigning multiple students under a mentor
    const { id } = request.params;
    const data = request.body;
    console.log(request.params, id);
    const mentor = await client.db("assign-mentor").collection("mentor").updateOne({ id: id },{$set:data});
    console.log(mentor);
    mentor? response.send(mentor) : response.send({ msg: "Mentor not found" });
});
app.put("/student/:id", async function (request, response) {        //api endpoint for assigning a mentor to a student
    const { id } = request.params;
    const data = request.body;
    console.log(request.params, id);
    const student = await client.db("assign-mentor").collection("student").updateOne({ id: id },{$set:data});
    console.log(student);
    student? response.send(student) : response.send({ msg: "Student not found" });
});
app.get("/mentors/:id", async function (request, response) {        //api endpoint for viewing all students under a mentor
    const { id } = request.params;
    console.log(request.params, id);
    const studentfind = await client.db("assign-mentor").collection("mentor").findOne({id:id});
    const student= await client.db("assign-mentor").collection("student").findOne({mentorid:id});
    console.log(studentfind, student);
    const result =[studentfind, student];
    response.send(result);
});
app.listen(PORT, () => console.log(`App started in ${PORT}`));
