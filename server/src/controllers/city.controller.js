import CityService from "../services/city.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { generateAggregationPipeline } from "../utils/generatePipeline.js";
import { ObjectId } from "mongodb";

// Get All Cities
export async function getAllCitiesController(req, res, next) {
  try {
    const queryParams = req.query;
    const matchQuery = {};

    if (queryParams.search && typeof queryParams.search === "string") {
      matchQuery.$or = [
        { name: { $regex: queryParams.search, $options: "i" } },
      ];
    }

    if (queryParams?.stateId) {
      matchQuery.stateId = new ObjectId(queryParams.stateId);
    }
    let pipeline = [{ $match: matchQuery }];
    pipeline = generateAggregationPipeline(queryParams, pipeline, "updatedAt");

    const [cities] = await CityService.findAll(pipeline);
    return OK(res, cities, "Cities retrieved successfully.");
  } catch (error) {
    next(error);
  }
}

// Create City
export async function createCityController(req, res, next) {
  try {
    const { name, countryId, stateId } = req.body;
    if (!name || !countryId || !stateId) {
      return BAD(res, "Missing required fields: name, countryId, and stateId.");
    }
    const existingCity = await CityService.findBy("name", name);
    if (existingCity) {
      return BAD(res, "City with this name already exists.");
    }
    const city = await CityService.create(req.body);
    return OK(res, city, "City created successfully.");
  } catch (error) {
    next(error);
  }
}

// Update City
export async function updateCityController(req, res, next) {
  try {
    const { id } = req.params;
    const updatedCity = await CityService.updateCity(id, req.body);
    if (!updatedCity) {
      return BAD(res, "City not found.");
    }
    return OK(res, updatedCity, "City updated successfully.");
  } catch (error) {
    next(error);
  }
}

// Delete City
export async function deleteCityController(req, res, next) {
  try {
    const { id } = req.params;
    const deletedCity = await CityService.deleteCity(id);
    if (!deletedCity) {
      return BAD(res, "City not found.");
    }
    return OK(res, deletedCity, "City deleted successfully.");
  } catch (error) {
    next(error);
  }
}

// Toggle City Active Status
export async function toggleCityController(req, res, next) {
  try {
    const { id } = req.params;
    const toggledCity = await CityService.toggleCityActiveStatus(id);
    if (!toggledCity) {
      return BAD(res, "City not found.");
    }
    return OK(res, toggledCity, "City active status toggled successfully.");
  } catch (error) {
    next(error);
  }
}
