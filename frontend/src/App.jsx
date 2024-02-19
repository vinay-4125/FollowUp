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
import EventList from "./components/dashboard/EventList/EventList.jsx";
import NotFound from "./components/NotFound.jsx";
import AddMemberForm from "./components/dashboard/AddMember/AddMemberForm.jsx";
import ForgetPassword from "./components/auth/ForgetPassword.jsx";
import NewInput from "./components/auth/NewInput.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import Settings from "./components/dashboard/Settings/Settings.jsx";
import UpdateMember from "./components/dashboard/AddMember/UpdateMember.jsx";
import DashboardBody from "./components/dashboard/DashboardBody.jsx";
import LandingPage from "./LandingPage.jsx";

// const ProtectedRoute = ({ path, element }) => {
//   const { user } = useAuthContext();
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     }
//   }, [user, navigate]);
//   return <Route path={path} element={element} />;
// };

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/login/forgetpassword" element={<ForgetPassword />} />
      <Route path="/reset-password/:id" element={<ResetPassword />} />
      <Route path="/newinput" element={<NewInput />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="main" element={<DashboardBody />} />
        <Route path="addmember" element={<AddMember />} />
        <Route path="addmember/new" element={<AddMemberForm />} />
        <Route path="update/:id" element={<UpdateMember />} />
        <Route path="eventlist" element={<EventList />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
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
            <Route path="main" element={<DashboardBody />} />
            <Route path="addmember" element={<AddMember />} />
            <Route path="addmember/new" element={<AddMemberForm />} />
            <Route path="update/:id" element={<UpdateMember />} />
            <Route path="eventlist" element={<EventList />} />
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
