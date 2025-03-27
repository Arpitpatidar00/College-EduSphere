import StateService from "../services/state.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { generateAggregationPipeline } from "../utils/generatePipeline.js";
import { ObjectId } from "mongodb";

// Get All States

export async function getAllStatesController(req, res, next) {
  try {
    const queryParams = req.query;

    const matchQuery = {};

    if (queryParams.search && typeof queryParams.search === "string") {
      matchQuery.$or = [
        { name: { $regex: queryParams.search, $options: "i" } },
      ];
    }

    if (queryParams?.countryId) {
      try {
        matchQuery.countryId = new ObjectId(queryParams.countryId);
      } catch (error) {
        return BAD(res, null, "Invalid countryId format", error);
      }
    }

    let pipeline = [{ $match: matchQuery }];

    pipeline = generateAggregationPipeline(queryParams, pipeline, "updatedAt");

    const [states] = await StateService.findAll(pipeline);
    return OK(res, states, "States retrieved successfully.");
  } catch (error) {
    next(error);
  }
}

// Create State
export async function createStateController(req, res, next) {
  try {
    const { name, abbreviation, continent, countryId } = req.body;
    if (!name || !abbreviation || !continent || !countryId) {
      return BAD(
        res,
        "Missing required fields: name, abbreviation, continent, and countryId."
      );
    }
    const existingState = await StateService.findBy("name", name);
    if (existingState) {
      return BAD(res, "State with this name already exists.");
    }
    const state = await StateService.create(req.body);
    return OK(res, state, "State created successfully.");
  } catch (error) {
    next(error);
  }
}

// Update State
export async function updateStateController(req, res, next) {
  try {
    const { id } = req.params;
    const updatedState = await StateService.updateState(id, req.body);
    if (!updatedState) {
      return BAD(res, "State not found.");
    }
    return OK(res, updatedState, "State updated successfully.");
  } catch (error) {
    next(error);
  }
}

// Delete State
export async function deleteStateController(req, res, next) {
  try {
    const { id } = req.params;
    const deletedState = await StateService.deleteState(id);
    if (!deletedState) {
      return BAD(res, "State not found.");
    }
    return OK(res, deletedState, "State deleted successfully.");
  } catch (error) {
    next(error);
  }
}

// Toggle State Active Status
export async function toggleStateController(req, res, next) {
  try {
    const { id } = req.params;
    const toggledState = await StateService.toggleStateActiveStatus(id);
    if (!toggledState) {
      return BAD(res, "State not found.");
    }
    return OK(res, toggledState, "State active status toggled successfully.");
  } catch (error) {
    next(error);
  }
}
