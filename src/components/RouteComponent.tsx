import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import AuthPage from "./auth/AuthPage";
import StudentDashboard from "./student/StudentDashboard";
import TeacherDashboard from "./teacher/TeacherDashboard";
import CodeWorkspace from "./workspace/CodeWorkspace";
import NotFound from "./common/NotFound";

const RouteComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<AuthPage />} />
        <Route
          path={"/student"}
          element={
            <RequireAuth fallbackPath={"/"}>
              <StudentDashboard />
            </RequireAuth>
          }
        />
        <Route
          path={"/teacher"}
          element={
            <RequireAuth fallbackPath={"/"}>
              <TeacherDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/workspace"
          element={
            <RequireAuth fallbackPath={"/"}>
              <CodeWorkspace />
            </RequireAuth>
          }
        />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteComponent;
