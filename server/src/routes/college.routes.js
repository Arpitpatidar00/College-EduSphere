import express from "express";
import { collegeController } from "../controllers/index.js";

const router = express.Router();

router.post("/signup", collegeController.collegeSignupController);

router.post("/login", collegeController.collegeLoginController);

export default router;
