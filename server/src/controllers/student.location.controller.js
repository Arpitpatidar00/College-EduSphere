// controllers/index.js (for exporting)

import LocationService from "../services/student.location.service.js";
import { OK, BAD } from "../lib/responseHelper.js";

export async function updateLocationController(req, res, next) {
  try {
    const { latitude, longitude } = req.body;
    const studentId = req.user._id; // Assuming authMiddleware sets req.user

    if (!latitude || !longitude) {
      return BAD(res, "Missing required fields (latitude or longitude)");
    }

    const result = await LocationService.updateLocation(
      studentId,
      latitude,
      longitude
    );
    return OK(res, result, "Location updated successfully");
  } catch (error) {
    next(error);
  }
}

export async function getNearbyStudentsController(req, res, next) {
  try {
    const studentId = req.user._id;
    const { latitude, longitude } = req.query;

    if (!studentId || !latitude || !longitude) {
      return BAD(
        res,
        "Missing required fields (studentId, latitude, or longitude)"
      );
    }

    const nearbyStudents = await LocationService.getNearbyStudents(
      studentId,
      latitude,
      longitude
    );

    return OK(res, nearbyStudents, "Nearby students retrieved successfully");
  } catch (error) {
    console.error("Controller - Error:", error);
    next(error);
  }
}
