import { StudentLocation } from "../database/models/StudentLocation.model.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

class LocationService {
  static instance = null;

  static getInstance() {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  /**
   * Update the location of the student.
   * @param {string} studentId - The student's ID.
   * @param {number|string} latitude - The latitude.
   * @param {number|string} longitude - The longitude.
   */
  async updateLocation(studentId, latitude, longitude) {
    const location = {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    };

    const result = await StudentLocation.findOneAndUpdate(
      { studentId: new ObjectId(studentId) },
      { location, updatedAt: Date.now() },
      { upsert: true, new: true }
    );

    return result;
  }

  /**
   * Retrieve students near the given location.
   * @param {string} studentId - The current student's ID.
   * @param {number|string} latitude - The latitude.
   * @param {number|string} longitude - The longitude.
   * @returns {Array} - Array of nearby student objects.
   */
  async getNearbyStudents(studentId, latitude, longitude) {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (!studentId || isNaN(lat) || isNaN(lng)) {
      throw new Error("Missing or invalid studentId, latitude, or longitude.");
    }

    const userLocation = {
      type: "Point",
      coordinates: [lng, lat],
    };

    const nearbyStudents = await StudentLocation.aggregate([
      {
        $geoNear: {
          near: userLocation,
          distanceField: "distance",
          maxDistance: 2000,
          spherical: true,
          key: "location",
          distanceMultiplier: 1,
          query: {
            updatedAt: { $gt: new Date(Date.now() - 1000 * 60 * 1000) },
          },
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student",
        },
      },
      { $unwind: "$student" },
      {
        $project: {
          studentId: 1,
          username: { $ifNull: ["$student.firstName", "Unknown"] },
          profilePicture: { $ifNull: ["$student.profilePicture", "Unknown"] },
          collegeId: { $ifNull: ["$student.collegeId", "Unknown"] },
          distance: { $round: ["$distance", 0] },
          lat: { $arrayElemAt: ["$location.coordinates", 1] },
          lng: { $arrayElemAt: ["$location.coordinates", 0] },
        },
      },
    ]);

    const mappedStudents = nearbyStudents.map((student) => ({
      studentId: student.studentId.toString(),
      name: student.username,
      profilePicture: student.profilePicture,
      collegeId: student.collegeId,
      distance: `${student.distance}m`,
      lat: student.lat,
      lng: student.lng,
    }));

    return mappedStudents;
  }
}

export default LocationService.getInstance();
