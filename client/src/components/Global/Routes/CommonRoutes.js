const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET_KEY;
import { UserType } from "../../../enums/AuthConstants";

export const ROUTES = {
  COLLEGE: {
    INDEX: "",
    LOGIN: "/college/login",
    DASHBOARD: "/college",
    STUDENT: "/college/student",
  },
  USER: {
    LOGIN: "/user/login",
    INDEX: "/",
  },
  AUTH: {
    STUDENT: `/auth/${UserType.STUDENT}`,
    COLLEGE: `/auth/${UserType.COLLEGE}`,
  },
  HOME: {
    LOGIN: "/login",
    INDEX: "/",
    PROFILE: "/profile",
    MESSAGE: "/message",
    STORIES: "/stories",
    SETTING: "/setting",
  },
  ADMIN: {
    INDEX: `/sysopdmin/${ADMIN_SECRET}`,
    LOGIN: `/sysopdmin/login/${ADMIN_SECRET}`,
    LOCATION: {
      COUNTRY: `/sysopdmin/${ADMIN_SECRET}/location/country`,
      STATE: `/sysopdmin/${ADMIN_SECRET}/location/state`,
      CITY: `/sysopdmin/${ADMIN_SECRET}/location/city`,
    },
  },
};

export default ROUTES;
