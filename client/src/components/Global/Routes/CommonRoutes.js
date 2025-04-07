const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET_KEY;
import { UserType } from "../../../enums/AuthConstants";

export const ROUTES = {
  COLLEGE: {
    INDEX: "",
    LOGIN: "/college/login",
    DASHBOARD: "/college",
    STUDENT: "/college/student",
    POST: "/college/posts",
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
    LOCATION: "/location",
  },
  ADMIN: {
    INDEX: `/sysopdmin/${ADMIN_SECRET}`,
    LOGIN: `/sysopdmin/login/${ADMIN_SECRET}`,
    COLLEGE: "colleges",
    PENDING: "pending-approvals",
    STUDENT: "students",
    LOCATION: {
      COUNTRY: "location/country",
      STATE: "location/state",
      CITY: "location/city",
    },
  },
};

export default ROUTES;
