import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import DescriptionIcon from "@mui/icons-material/Description";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";

export const navigationItems = [
  {
    id: "home",
    icon: HomeIcon,
    label: "Home",
    path: "/admin",
  },
  {
    id: "location",
    icon: LocationCityIcon,
    label: "Location",
    path: "/admin/location",
    subItems: [
      { id: "city", label: "City", path: "/admin/location/city" },
      { id: "state", label: "State", path: "/admin/location/state" },
      { id: "country", label: "Country", path: "/admin/location/country" },
    ],
  },
  {
    id: "college",
    icon: SchoolIcon,
    label: "Colleges",
    path: "/admin/colleges",
  },
  {
    id: "students",
    icon: PeopleIcon,
    label: "Students",
    path: "/admin/students",
  },
  {
    id: "complaints",
    icon: ReportProblemIcon,
    label: "Complaints",
    path: "/admin/complaints",
  },
  {
    id: "documents",
    icon: DescriptionIcon,
    label: "Documents",
    path: "/admin/documents",
  },
  {
    id: "mail",
    icon: EmailIcon,
    label: "Mail",
    path: "/admin/mail",
  },
  {
    id: "schedule",
    icon: AccessTimeIcon,
    label: "Schedule",
    path: "/admin/schedule",
  },
  {
    id: "settings",
    icon: SettingsIcon,
    label: "Settings",
    path: "/admin/settings",
  },
  {
    id: "help",
    icon: HelpIcon,
    label: "Help",
    path: "/admin/help",
  },
];
