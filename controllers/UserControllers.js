import { createstudents, listingstudents, creatementors, listingmentors, assignstudents, assignmentors, findboth } from "../models/UserModels.js";
export const controller={
    post: async function (request, response) {       //api endpoint for creating students
        const data = request.body;
        console.log(data);
        const result = await createstudents(data);
        console.log(result);
        response.send(result);
    },
    get: async function (request, response) {          //api endpoint for getting students
        console.log(request.query);
        const students = await listingstudents(request);
        response.send(students);
    },
    post: async function (request, response) {          //api endpoint for creating mentors
        const data = request.body;
        console.log(data);
        const result = await creatementors(data);
        console.log(result);
        response.send(result);
    },
    get: async function (request, response) {            //api endpoint for getting mentors
        console.log(request.query);
        const mentors = await listingmentors(request);
        response.send(mentors);
    },
    put: async function (request, response) {       //api endpoint for assigning multiple students under a mentor
        const { id } = request.params;
        const data = request.body;
        console.log(request.params, id);
        const mentor = await assignstudents(id,data);
        console.log(mentor);
        mentor? response.send(mentor) : response.send({ msg: "Mentor not found" });
    },
    put: async function (request, response) {        //api endpoint for assigning a mentor to a student
        const { id } = request.params;
        const data = request.body;
        console.log(request.params, id);
        const student = await assignmentors(id,data);
        console.log(student);
        student? response.send(student) : response.send({ msg: "Student not found" });
    },
    get: async function (request, response) {        //api endpoint for viewing all students under a mentor
        const { id } = request.params;
        console.log(request.params, id);
        const studentfind = await findboth(id);
        const student= await findboth(id);
        console.log(studentfind, student);
        const result =[studentfind, student];
        response.send(result);
    }

}