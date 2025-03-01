const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET_KEY;
import { UserType } from "../../../enums/AuthConstants";

export const ROUTES = {
  COLLEGE: {
    INDEX: "/",
    LOGIN: "/college/login",
    DETAILS: "/college",
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
    LOGIN: `/sysopdmin/${ADMIN_SECRET}/login`,
  },
};

export default ROUTES;
