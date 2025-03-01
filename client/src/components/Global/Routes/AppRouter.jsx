// AppRouter.jsx
import { Outlet, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ROUTES from "./CommonRoutes.js";
import HomePage from "../../../pages/Home.page";
import { ProtectedRoute, UnProtectedRoute } from "../Routes/ProtectedRoutes.jsx";
import EditProfile from "../../../pages/Edit.profile.page";
import NotFoundPage from "../../../pages/NotFound.page.jsx";
import Navbar from "../../layout/Navbar/Navbar.jsx";
import SettingPage from "../../../pages/Setting.page.jsx";
import StoriesPage from "../../../pages/StoriesPage";
import StudentAuthContainer from '../../Auth/StudentAuth/StudentAuthContainer.jsx';
import CollegeAuthContainer from '../../Auth/CollegeAuth/CollegeAuth.container.jsx';
import ChatApp from '../../modules/ChatMain/index';
import UserProfile from '../../../pages/Profile.page';

const AppRouter = ({ toggleTheme }) => {
  return (
    <Router>
      <Navbar />
      <Routes>
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

        <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
          <Route path={ROUTES.HOME.INDEX} element={<HomePage toggleTheme={toggleTheme} />} />
          <Route path={ROUTES.HOME.PROFILE} element={<UserProfile toggleTheme={toggleTheme} />} />
          <Route path="/edit-profile" element={<EditProfile toggleTheme={toggleTheme} />} />
          <Route path={ROUTES.HOME.MESSAGE} element={<ChatApp toggleTheme={toggleTheme} />} />
          <Route path={ROUTES.HOME.SETTING} element={<SettingPage toggleTheme={toggleTheme} />} />
          <Route path={ROUTES.HOME.STORIES} element={<StoriesPage toggleTheme={toggleTheme} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
