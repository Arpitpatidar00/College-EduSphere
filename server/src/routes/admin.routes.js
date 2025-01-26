// routes/admin.routes.js

import express from "express";
import { adminController } from "../controllers/index.js"; // Admin controller
const router = express.Router();

router.post("/login", adminController.adminLoginController);
router.post("/signup", adminController.adminSignupController);

export default router;
