import express from "express";
import {
  countryController,
  stateController,
  cityController,
} from "../controllers/index.js";
import {
  adminCheckMiddleware,
  authMiddleware,
} from "../middlewares/auth.middleware.js";
const router = express.Router();

//@country
router.get("/get-all-counties", countryController.getAllCountriesController);

router.post(
  "/create",
  authMiddleware,
  adminCheckMiddleware,
  countryController.createCountryController
);
router.put(
  "/update-country:id",
  authMiddleware,
  adminCheckMiddleware,
  countryController.updateCountryController
);
router.delete(
  "/delete-country/:id",
  authMiddleware,
  adminCheckMiddleware,
  countryController.deleteCountryController
);
router.patch(
  "/country-activate/:id",
  authMiddleware,
  adminCheckMiddleware,
  countryController.toggleCountryController
);

//@state

router.get("/get-all-states", stateController.getAllStatesController);

router.post(
  "/create-state",
  authMiddleware,
  adminCheckMiddleware,
  stateController.createStateController
);

router.put(
  "/update-state/:id",
  authMiddleware,
  adminCheckMiddleware,
  stateController.updateStateController
);

router.delete(
  "/delete-state/:id",
  authMiddleware,
  adminCheckMiddleware,
  stateController.deleteStateController
);

router.patch(
  "/state-activate/:id",
  authMiddleware,
  adminCheckMiddleware,
  stateController.toggleStateController
);

//@city

router.get("/get-all-cities", cityController.getAllCitiesController);

router.post(
  "/create-city",
  authMiddleware,
  adminCheckMiddleware,
  cityController.createCityController
);

router.put(
  "/update-city/:id",
  authMiddleware,
  adminCheckMiddleware,
  cityController.updateCityController
);

router.delete(
  "/delete-city/:id",
  authMiddleware,
  adminCheckMiddleware,
  cityController.deleteCityController
);

router.patch(
  "/city-activate/:id",
  authMiddleware,
  adminCheckMiddleware,
  cityController.toggleCityController
);

export default router;
