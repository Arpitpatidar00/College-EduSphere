import { countryService } from "../services/country.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { generateAggregationPipeline } from "../utils/generatePipeline.js";

// Get All Countries
export async function getAllCountriesController(req, res, next) {
  try {
    const queryParams = req.query;
    const matchQuery = {};

    if (queryParams.searchTerm) {
      matchQuery.$or = [
        { name: { $regex: queryParams.searchTerm, $options: "i" } },
      ];
    }

    let pipeline = [{ $match: matchQuery }];

    pipeline = generateAggregationPipeline(queryParams, pipeline, "updatedAt");

    const [result] = await countryService.findAll(pipeline);

    return OK(res, result, "Countries retrieved successfully.");
  } catch (error) {
    next(error);
  }
}

// Create Country
export async function createCountryController(req, res, next) {
  try {
    const { name, code, continent } = req.body;
    if (!name || !code || !continent) {
      return BAD(res, "Missing required fields: name, code, and continent.");
    }

    const existingCountry = await countryService.findBy("code", code);
    if (existingCountry) {
      return BAD(res, "Country with this code already exists.");
    }

    const country = await countryService.create(req.body);
    return OK(res, country, "Country created successfully.");
  } catch (error) {
    next(error);
  }
}

// Update Country
export async function updateCountryController(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedCountry = await countryService.updateCountry(id, updateData);
    if (!updatedCountry) {
      return BAD(res, "Country not found.");
    }
    return OK(res, updatedCountry, "Country updated successfully.");
  } catch (error) {
    next(error);
  }
}

// Delete Country
export async function deleteCountryController(req, res, next) {
  try {
    const { id } = req.params;
    const deletedCountry = await countryService.deleteCountry(id);
    if (!deletedCountry) {
      return BAD(res, "Country not found.");
    }
    return OK(res, deletedCountry, "Country deleted successfully.");
  } catch (error) {
    next(error);
  }
}

// Toggle Country Active Status
export async function toggleCountryController(req, res, next) {
  try {
    const { id } = req.params;
    const toggledCountry = await countryService.toggleCountryActiveStatus(id);
    if (!toggledCountry) {
      return BAD(res, "Country not found.");
    }
    return OK(
      res,
      toggledCountry,
      "Country active status toggled successfully."
    );
  } catch (error) {
    next(error);
  }
}
