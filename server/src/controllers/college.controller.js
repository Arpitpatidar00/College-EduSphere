import { collegeService } from "../services/college.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { generateAggregationPipeline } from "../utils/generatePipeline.js";
import { ObjectId } from "mongodb";

export async function getAllCollegeController(req, res, next) {
  try {
    const queryParams = req.query;

    const matchQuery = {};

    if (queryParams.searchTerm && typeof queryParams.searchTerm === "string") {
      matchQuery.$or = [
        { name: { $regex: queryParams.searchTerm, $options: "i" } },
      ];
    }

    if (queryParams?.collegeId) {
      try {
        matchQuery.collegeId = new ObjectId(queryParams.collegeId);
      } catch (error) {
        return BAD(res, null, "Invalid collegeId format", error);
      }
    }

    let pipeline = [{ $match: matchQuery }];

    pipeline = generateAggregationPipeline(queryParams, pipeline, "updatedAt");

    const [college] = await collegeService.findAll(pipeline);
    return OK(res, college, "Colleges retrieved successfully.");
  } catch (error) {
    next(error);
  }
}
