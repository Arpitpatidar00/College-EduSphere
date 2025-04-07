import mongoose from "mongoose";

const StudentLocationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
    unique: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a 2dsphere index to support geospatial queries
StudentLocationSchema.index({ location: "2dsphere" });

export const StudentLocation = mongoose.model(
  "StudentLocation",
  StudentLocationSchema
);
