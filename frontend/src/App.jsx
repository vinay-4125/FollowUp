import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import AddMember from "./components/dashboard/AddMember/AddMember.jsx";
import NotFound from "./components/NotFound.jsx";
import AddMemberForm from "./components/dashboard/AddMember/AddMemberForm.jsx";
import ForgetPassword from "./components/auth/ForgetPassword.jsx";
import NewInput from "./components/auth/NewInput.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import Settings from "./components/dashboard/Settings/Settings.jsx";
import UpdateMember from "./components/dashboard/AddMember/UpdateMember.jsx";
import DashboardBody from "./components/dashboard/DashboardBody.jsx";
import LandingPage from "./LandingPage.jsx";
import ReminderList from "./components/dashboard/ReminderList/ReminderList.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import { io } from "socket.io-client";
import { useEffect } from "react";
import PublicRouteLogin from "./components/PublicRouteLogin.jsx";
import UpdateReminder from "./components/dashboard/ReminderList/UpdateReminder.jsx";
import SuperAdminLogin from "./components/dashboard/SuperAdmin/SuperAdminLogin.jsx";
import SuperAdminDashboard from "./components/dashboard/SuperAdmin/SuperAdminDashboard.jsx";
import SuperAdminDashboardBody from "./components/dashboard/SuperAdmin/Dashboard/SuperAdminDashboardBody.jsx";
import SuperAdminSettings from "./components/dashboard/SuperAdmin/Dashboard/SuperAdminSettings.jsx";

// const ProtectedRoute = ({ path, element }) => {
//   const { user } = useAuthContext();
//   return user ? (
//     <Route path={path} element={element} />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPage />} />

      <Route element={<PublicRouteLogin />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/login/forgetpassword" element={<ForgetPassword />} />
      <Route path="/reset-password/:id" element={<ResetPassword />} />
      <Route path="/newinput" element={<NewInput />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardBody />} />
          <Route path="addmember" element={<AddMember />} />
          <Route path="addmember/new" element={<AddMemberForm />} />
          <Route path="member/update/:id" element={<UpdateMember />} />
          <Route path="reminderlist" element={<ReminderList />} />
          <Route path="reminder/update/:id" element={<UpdateReminder />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      <Route path="/superadmin">
        <Route path="login" element={<SuperAdminLogin />} />
        <Route path="dashboard" element={<SuperAdminDashboard />}>
          <Route index element={<SuperAdminDashboardBody />} />
          <Route path="settings" element={<SuperAdminSettings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/forgetpassword" element={<ForgetPassword />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
          <Route path="/newinput" element={<NewInput />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardBody />} />
            <Route path="addmember" element={<AddMember />} />
            <Route path="addmember/new" element={<AddMemberForm />} />
            <Route path="update/:id" element={<UpdateMember />} />
            <Route path="reminderlist" element={<ReminderList />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
