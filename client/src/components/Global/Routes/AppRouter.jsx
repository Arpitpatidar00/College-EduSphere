// AppRouter.jsx
import { Outlet, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ROUTES from "./CommonRoutes.js";
import HomePage from "../../../pages/Home.page";
import { ProtectedRoute, UnProtectedRoute } from "../Routes/ProtectedRoutes.jsx";
import EditProfile from "../../../pages/Edit.profile.page";
import NotFoundPage from "../../../pages/NotFound.page.jsx";
import MessagePage from "../../../pages/Message.page";
import Navbar from "../../layout/Navbar/Navbar.jsx";
import SettingPage from "../../../pages/Setting.page.jsx";
import UserProfile from "../../HomePage/Accounts/UserProfile.jsx";
import StoriesPage from "../../../pages/StoriesPage";
import StudentAuthContainer from '../../Auth/StudentAuth/StudentAuthContainer.jsx';
import CollegeAuthContainer from '../../Auth/CollegeAuth/CollegeAuth.container.jsx';

const AppRouter = ({ toggleTheme }) => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Routes for non-authenticated users */}
        <Route element={<UnProtectedRoute><Outlet /></UnProtectedRoute>}>
          <Route
            path={ROUTES.AUTH.STUDENT}
            element={<StudentAuthContainer toggleTheme={toggleTheme} />}
          />
          <Route
            path={ROUTES.AUTH.COLLEGE}
            element={<CollegeAuthContainer toggleTheme={toggleTheme} />}
          />
        </Route>

        {/* Protected routes for authenticated users */}
        <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
          <Route path="/" element={<HomePage toggleTheme={toggleTheme} />} />
          <Route path="/profile" element={<UserProfile toggleTheme={toggleTheme} />} />
          <Route path="/edit-profile" element={<EditProfile toggleTheme={toggleTheme} />} />
          <Route path="/message" element={<MessagePage toggleTheme={toggleTheme} />} />
          <Route path="/setting" element={<SettingPage toggleTheme={toggleTheme} />} />
          <Route path="/story" element={<StoriesPage toggleTheme={toggleTheme} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
