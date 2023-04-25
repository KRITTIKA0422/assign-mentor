import express from "express";
import {controller} from "../controllers/UserControllers.js";
const router1=express.Router();
const router2=express.Router();
const router3=express.Router();
router1.post("/", controller.poststudents);
router1.get("/", controller.getstudents);
router2.post("/", controller.postmentors);
router2.get("/",controller.getmentors);
router2.put("/:id",controller.putmultiplestudents);
router1.put("/:id", controller.putassignmentor);
router3.get("/:id",controller.getboth);

export const studentRouter= router1;
export const mentorRouter= router2;
export const mentorstuRouter= router3;


