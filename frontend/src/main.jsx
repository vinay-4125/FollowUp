import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
// ]);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path="/" element={<App />} />

//       <Route path="/login" element={<Login />} />
//       <Route path="/login/forgetpassword" element={<ForgetPassword />} />
//       <Route path="/reset-password/:id" element={<ResetPassword />} />
//       <Route path="/newinput" element={<NewInput />} />
//       <Route path="/signup" element={<Signup />} />

//       <Route path="/dashboard" element={<Dashboard />}>
//         <Route path="main" element={<DashboardBody />} />
//         <Route path="addmember" element={<AddMember />} />
//         <Route path="addmember/new" element={<AddMemberForm />} />
//         <Route path="update/:id" element={<UpdateMember />} />
//         <Route path="eventlist" element={<EventList />} />
//         <Route path="settings" element={<Settings />} />
//         <Route path="*" element={<NotFound />} />
//       </Route>
//       <Route path="*" element={<NotFound />} />
//     </Route>
//   )
// );

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          {/* <RouterProvider router={router} /> */}
          <App />
        </QueryClientProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
