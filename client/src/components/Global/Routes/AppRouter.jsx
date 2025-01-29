import { Outlet, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import LoginPage from "../../../pages/Login.page";
import HomePage from "../../../pages/Home.page";
import { ProtectedRoute, UnProtectedRoute } from "./ProtectedRoutes";
import Profile from "../../../pages/Profile.page";
import EditProfile from "../../../pages/Edit.profile.page";
import NotFoundPage from "../../../pages/NotFound.page.jsx";

const AppRouter = ({ toggleTheme }) => {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route
          path="/"
          element={
            <UnProtectedRoute>
              <LoginPage />
            </UnProtectedRoute>
          }
        />

        {/* Protected Route */}
        <Route
          element={
            <>
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            </>
          }
        >
          <Route
            path="/home"
            element={<HomePage toggleTheme={toggleTheme} />}
          />
          <Route
            path="/profile"
            element={<Profile toggleTheme={toggleTheme} />}
          />
          <Route
            path="/edit-profile"
            element={<EditProfile toggleTheme={toggleTheme} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
