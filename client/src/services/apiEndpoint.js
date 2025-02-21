export const apiEndPoints = {
  //@admin
  adminLogin: "/auth/admin/login",
  adminSignup: "/auth/admin/signup",

  //@college
  collegeSignup: "/auth/college/signup",
  collegeLogin: "/auth/college/login",
  getAllCollege:"/college/get-all-colleges",

  //@student
  studentLogin: "/auth/user/login",
  studentSignup: "/auth/user/signup",

  //@location - Countries
  getAllCountries: "/location/get-all-counties",
  createCountry: "/location/create",
  updateCountry: "/location/update-country",
  deleteCountry: "/location/delete-country",
  toggleCountry: "/location/country-activate",

  //@location - States
  getAllStates: "/location/get-all-states",
  createState: "/location/create-state",
  updateState: "/location/update-state",
  deleteState: "/location/delete-state",
  toggleState: "/location/state-activate",

  //@location - Cities
  getAllCities: "/location/get-all-cities",
  createCity: "/location/create-city",
  updateCity: "/location/update-city",
  deleteCity: "/location/delete-city",
  toggleCity: "/location/city-activate",
};
