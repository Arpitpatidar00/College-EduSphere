// AppRouter.jsx
import { Outlet, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ROUTES from "./CommonRoutes.js";
import HomePage from "../../../pages/Home.page";
import { ProtectedRoute, UnProtectedRoute, AdminProtectedRoute, AdminUnProtectedRoute } from "../Routes/ProtectedRoutes.jsx";
import EditProfile from "../../../pages/Edit.profile.page";
import NotFoundPage from "../../../pages/NotFound.page.jsx";
import Navbar from "../../layout/Navbar/Navbar.jsx";
import SettingPage from "../../../pages/Setting.page.jsx";
import StoriesPage from "../../../pages/StoriesPage";
import StudentAuthContainer from '../../Auth/StudentAuth/StudentAuthContainer.jsx';
import CollegeAuthContainer from '../../Auth/CollegeAuth/CollegeAuth.container.jsx';
import ChatApp from '../../modules/ChatMain/index';
import UserProfile from '../../../pages/Profile.page';
import AdminDashboard from '../../modules/Admin/AdminDashboard/AdminDashboard';
import AdminLoginPage from '../../Auth/AdminAuth/AdminLogin';

const AppRouter = ({ toggleTheme }) => {
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* Public Routes (Unauthenticated Users) */}
        <Route element={<UnProtectedRoute><Outlet /></UnProtectedRoute>}>
          <Route path={ROUTES.AUTH.STUDENT} element={<StudentAuthContainer toggleTheme={toggleTheme} />} />
          <Route path={ROUTES.AUTH.COLLEGE} element={<CollegeAuthContainer toggleTheme={toggleTheme} />} />
        </Route>

        {/* Admin Login Page (Protected by Admin Secret) */}
        <Route element={<AdminUnProtectedRoute><Outlet /></AdminUnProtectedRoute>}>
          <Route path={ROUTES.ADMIN.LOGIN} element={<AdminLoginPage toggleTheme={toggleTheme} />} />
        </Route>

        {/* Protected Routes (Authenticated Users) */}
        <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
          <Route path={ROUTES.HOME.INDEX} element={<HomePage toggleTheme={toggleTheme} />} />
          <Route path={ROUTES.HOME.PROFILE} element={<UserProfile toggleTheme={toggleTheme} />} />
          <Route path="/edit-profile" element={<EditProfile toggleTheme={toggleTheme} />} />
          <Route path={ROUTES.HOME.MESSAGE} element={<ChatApp toggleTheme={toggleTheme} />} />
          <Route path={ROUTES.HOME.SETTING} element={<SettingPage toggleTheme={toggleTheme} />} />
          <Route path={ROUTES.HOME.STORIES} element={<StoriesPage toggleTheme={toggleTheme} />} />
        </Route>

        {/* Admin Protected Routes (For Admin Dashboard) */}
        <Route element={<AdminProtectedRoute><Outlet /></AdminProtectedRoute>}>
          <Route path={ROUTES.ADMIN.INDEX} element={<AdminDashboard toggleTheme={toggleTheme} />} />
        </Route>

        {/* Catch-All Route for 404 */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;
