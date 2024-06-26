import express from "express"
import {register, login, logout, myTask} from "../controller/auth.js";

const router = express.Router();
router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.post("/myTask", myTask);
export default router;