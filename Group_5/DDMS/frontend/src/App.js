import "./App.css";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { ForgotPassword } from "./component/Login & Registration/Forget-Password";
import { ResetPassword } from "./component/Login & Registration/ResetPassword";
// import Dashboard from "./component/Dashboard/Dashboard";
// import MyAccount from "./pages/MyAccount";
// import HeaderAction from "./component/Dashboard/Header";
// import UserTabs from "./pages/UserTabs";
// import AttendanceTabs from "./pages/AttendanceTabs";
// import Subjects from "./pages/Subjects";
// import AuthenticatedRoute from "./Authentication/AuthenticatedRoute";
// import PreventReLogin from "./Authentication/PreventReLogin";
// import AdminRoute from "./Authentication/AdminRoute";
// import FacultyOrAdminRoute from "./Authentication/FacultyOrAdminRoute";
import { Center, Loader } from "@mantine/core";
import MarksTabs from "./pages/MarksTabs";
import MiscellaneousTabs from "./pages/MiscellaneousTabs";
const LoginForm = React.lazy(() =>
  import("./component/Login & Registration/Login")
);
const ErrorPage = React.lazy(() => import("./component/Error/ErrorPage"));
const Dashboard = React.lazy(() => import("./component/Dashboard/Dashboard"));
const MyAccount = React.lazy(() => import("./pages/MyAccount"));
const HeaderAction = React.lazy(() => import("./component/Dashboard/Header"));
const Footer = React.lazy(() => import("./component/Dashboard/Footer"));
const UserTabs = React.lazy(() => import("./pages/UserTabs"));
const AttendanceTabs = React.lazy(() => import("./pages/AttendanceTabs"));
const Subjects = React.lazy(() => import("./pages/Subjects"));
const AuthenticatedRoute = React.lazy(() =>
  import("./Authentication/AuthenticatedRoute")
);
const PreventReLogin = React.lazy(() =>
  import("./Authentication/PreventReLogin")
);
const AdminRoute = React.lazy(() => import("./Authentication/AdminRoute"));
const FacultyOrAdminRoute = React.lazy(() =>
  import("./Authentication/FacultyOrAdminRoute")
);

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <>
            <Center style={{ height: 700 }}>
              <span class="loader"></span>
            </Center>
            <Center>
              <Loader size={"xl"} variant={"dots"} color={"black"} />
            </Center>
          </>
        }
      >
        <BrowserRouter>
          <HeaderAction />
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="/"
              element={
                <PreventReLogin>
                  <LoginForm />
                </PreventReLogin>
              }
            />
            {<Route path="/forgot-password" element={<ForgotPassword />} />}
            {<Route path="/reset-password" element={<ResetPassword />} />}
            <Route
              path="/dashboard"
              element={
                <AuthenticatedRoute>
                  <Dashboard />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/user-mgmt/:tabValue"
              element={
                <AuthenticatedRoute>
                  <AdminRoute>
                    <UserTabs />
                  </AdminRoute>
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/attend-mgmt/:tabValue"
              element={
                <AuthenticatedRoute>
                  <FacultyOrAdminRoute>
                    <AttendanceTabs />
                  </FacultyOrAdminRoute>
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/subject-mgmt/:tabValue"
              element={
                <AuthenticatedRoute>
                  <FacultyOrAdminRoute>
                    <Subjects />
                  </FacultyOrAdminRoute>
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/marks-mgmt/:tabValue"
              element={
                <AuthenticatedRoute>
                  <FacultyOrAdminRoute>
                    <MarksTabs />
                  </FacultyOrAdminRoute>
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/miscellaneous-mgmt/:tabValue"
              element={
                <AuthenticatedRoute>
                  <FacultyOrAdminRoute>
                    <MiscellaneousTabs />
                  </FacultyOrAdminRoute>
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/my-account"
              element={
                <AuthenticatedRoute>
                  <MyAccount />
                </AuthenticatedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        <Footer/>
      </Suspense>
    </div>
  );
}

export default App;
