import express from "express";
import { locationController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/update-location",
  authMiddleware,
  locationController.updateLocationController
);
router.get(
  "/nearby",
  authMiddleware,
  locationController.getNearbyStudentsController
);

export default router;
