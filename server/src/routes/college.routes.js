import express from "express";
import { collegeController } from "../controllers/index.js";
// import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/get-all-colleges", collegeController.getAllCollegeController);

export default router;
