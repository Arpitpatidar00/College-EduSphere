import { Suspense, lazy } from 'react';



import { Outlet, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../../layout/Navbar/Navbar.jsx';
import ROUTES from './CommonRoutes.js';
import { ProtectedRoute, UnProtectedRoute, AdminProtectedRoute, AdminUnProtectedRoute } from '../Routes/ProtectedRoutes.jsx';
import CollegeLayout from "@/components/modules/College/CollegeLayout.jsx"
import CollegeDashboard from "@/components/modules/College/CollegeDashboard/index"
// Lazy-loaded components (unchanged)
const HomePage = lazy(() => import('../../../pages/Home.page'));
const NotFoundPage = lazy(() => import('../../../pages/NotFound.page.jsx'));
const SettingPage = lazy(() => import('../../../pages/Setting.page.jsx'));
const StoriesPage = lazy(() => import('../../../pages/StoriesPage'));
const StudentAuthContainer = lazy(() => import('../../Auth/StudentAuth/StudentAuthContainer.jsx'));
const CollegeAuthContainer = lazy(() => import('../../Auth/CollegeAuth/CollegeAuth.container.jsx'));
const MessagePage = lazy(() => import("../../modules/MessagePage/index.jsx"));

const UserProfile = lazy(() => import('../../../pages/Profile.page'));
const AdminLoginPage = lazy(() => import('../../Auth/AdminAuth/AdminLogin'));
const Country = lazy(() => import('../../modules/Admin/Location/Country/index'));
const State = lazy(() => import('../../modules/Admin/Location/State/index'));
const City = lazy(() => import('../../modules/Admin/Location/City/index'));
const AdminLayout = lazy(() => import('../../modules/Admin/AdminLayout'));
const AdminDashboardContainer = lazy(() => import('../../modules/Admin/AdminDashboard/AdminDashboardContainer'));
import NProgressBar from '../../../common/NProgressBar';
import StudentList from '../../modules/College/StudentList/index';
import CollegeList from '@/components/modules/Admin/CollegeList/index.jsx';
import AdminStudentList from '@/components/modules/Admin/AdminStudentList/index.jsx';
import CollegePostData from '../../modules/College/CollegePostData/index';
const ActiveUserNear = lazy(() => import('../../../pages/ActiveUserNear'));




const AppRouter = ({ toggleTheme }) => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<NProgressBar />}>
        <Routes>
          {/* Public Routes (Unauthenticated Users) */}
          <Route element={<UnProtectedRoute><Outlet /></UnProtectedRoute>}>
            <Route path={ROUTES.AUTH.STUDENT} element={<StudentAuthContainer toggleTheme={toggleTheme} />} />
            <Route path={ROUTES.AUTH.COLLEGE} element={<CollegeAuthContainer toggleTheme={toggleTheme} />} />
          </Route>

          {/* Admin Login Page */}
          <Route element={<AdminUnProtectedRoute><Outlet /></AdminUnProtectedRoute>}>
            <Route path={ROUTES.ADMIN.LOGIN} element={<AdminLoginPage toggleTheme={toggleTheme} />} />
          </Route>

          <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
            <Route path={ROUTES.HOME.INDEX} element={<HomePage toggleTheme={toggleTheme} />} />
            <Route path={ROUTES.HOME.PROFILE} element={<UserProfile toggleTheme={toggleTheme} />} />
            <Route path={ROUTES.HOME.MESSAGE} element={<MessagePage toggleTheme={toggleTheme} />} />
            <Route path={ROUTES.HOME.LOCATION} element={<ActiveUserNear toggleTheme={toggleTheme} />} />
            <Route path={ROUTES.HOME.SETTING} element={<SettingPage toggleTheme={toggleTheme} />} />
            <Route path={ROUTES.HOME.STORIES} element={<StoriesPage toggleTheme={toggleTheme} />} />
          </Route>

          {/* Admin Protected Routes (Fixed) */}
          <Route
            path={ROUTES.ADMIN.INDEX}
            element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}
          >
            {/* Admin Dashboard */}
            <Route index element={<AdminDashboardContainer />} />

            {/* College Management */}
            <Route path={ROUTES.ADMIN.COLLEGE} element={<CollegeList />} />
            <Route path={ROUTES.ADMIN.STUDENT} element={<AdminStudentList />} />

            {/* Location Management */}
            <Route path={ROUTES.ADMIN.LOCATION.COUNTRY} element={<Country />} />
            <Route path={ROUTES.ADMIN.LOCATION.STATE} element={<State />} />
            <Route path={ROUTES.ADMIN.LOCATION.CITY} element={<City />} />


          </Route>



          <Route
            path={ROUTES.COLLEGE.DASHBOARD}
            element={<ProtectedRoute><CollegeLayout /></ProtectedRoute>}
          >
            <Route index element={<CollegeDashboard />} />
            <Route path={ROUTES.COLLEGE.STUDENT} element={<StudentList />} />
            <Route path={ROUTES.COLLEGE.POST} element={<CollegePostData />} />

          </Route>

          {/* Catch-All Route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
