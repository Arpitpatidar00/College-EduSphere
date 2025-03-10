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
import PostAddIcon from "@mui/icons-material/PostAdd";
import BarChartIcon from "@mui/icons-material/BarChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

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
    subItems: [
      { id: "all-colleges", label: "All Colleges", path: "/admin/colleges" },
      {
        id: "pending-approvals",
        label: "Pending Approvals",
        path: "/admin/colleges/approvals",
      },
    ],
  },
  {
    id: "students",
    icon: PeopleIcon,
    label: "Students",
    subItems: [
      { id: "all-students", label: "All Students", path: "/admin/students" },
      {
        id: "pending-approvals",
        label: "Pending Approvals",
        path: "/admin/students/approvals",
      },
    ],
  },
  {
    id: "posts",
    icon: PostAddIcon,
    label: "Post Moderation",
    path: "/admin/posts",
  },
  {
    id: "reports",
    icon: BarChartIcon,
    label: "Reports & Insights",
    path: "/admin/reports",
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
    id: "announcements",
    icon: NotificationsIcon,
    label: "Announcements",
    path: "/admin/announcements",
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
    id: "admin-access",
    icon: AdminPanelSettingsIcon,
    label: "Admin Access",
    path: "/admin/access",
  },
  {
    id: "help",
    icon: HelpIcon,
    label: "Help",
    path: "/admin/help",
  },
];
