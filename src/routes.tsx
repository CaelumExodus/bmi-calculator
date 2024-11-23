import UnauthorizedLayout from "./layouts/UnauthorizedLayout";
import AuthorizedLayout from "./layouts/AuthorizedLayout";
import { useAuth } from "./contexts/AuthContext";
import { Navigate, Route, Routes } from "react-router";
import LoginView from "./modules/authorization/views/LoginView.tsx";
import BmiCalculatorView from "./modules/bmiCalculator/views/BmiCalculatorView.tsx";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      { !isAuthenticated && (
        <Route path="/" element={ <UnauthorizedLayout/> }>
          <Route path="login" element={ <LoginView/> }/>
          <Route path="*" element={ <Navigate to="/login"/> }/>
        </Route>
      ) }

      { isAuthenticated && (
        <Route path="/" element={ <AuthorizedLayout/> }>
          <Route path="" element={ <BmiCalculatorView/> }/>
          <Route path="*" element={ <Navigate to=""/> }/>
        </Route>
      ) }
    </Routes>
  );
}
