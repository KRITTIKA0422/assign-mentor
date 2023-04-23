import { client } from "../index.js";

export async function createstudents(data) {
return await client.db("assign-mentor").collection("student").insertMany(data);
}
export async function listingstudents(request) {
return await client.db("assign-mentor").collection("student").find(request.query).toArray();
}
export async function creatementors(data) {
return await client.db("assign-mentor").collection("mentor").insertMany(data);
}
export async function listingmentors(request) {
return await client.db("assign-mentor").collection("mentor").find(request.query).toArray();
}
export async function assignstudents(id,data){
return await client.db("assign-mentor").collection("mentor").updateOne({ id: id },{$set:data});
}
export async function assignmentors(id,data){
return await client.db("assign-mentor").collection("student").updateOne({ id: id },{$set:data});
}
export async function findboth(id) {
return [
await client.db("assign-mentor").collection("mentor").findOne({id:id}),
await client.db("assign-mentor").collection("student").findOne({mentorid:id})];
}
