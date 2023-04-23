import express from "express";
import {controller} from "../controllers/UserControllers.js";
const router1=express.Router();
const router2=express.Router();
const router3=express.Router();
router1.post("/", controller.post);
router1.get("/", controller.get);
router2.post("/", controller.post);
router2.get("/",controller.get);
router2.put("/:id",controller.put);
router1.put("/:id", controller.put);
router3.get("/:id",controller.get);

export const studentRouter= router1;
export const mentorRouter= router2;
export const mentorstuRouter= router3;


