import UnauthorizedLayout from "./layouts/UnauthorizedLayout";
import AuthorizedLayout from "./layouts/AuthorizedLayout";
import { useAuth } from "./contexts/AuthContext";
import { Navigate, Route, Routes } from "react-router";
import LoginView from "./modules/authorization/views/LoginView.tsx";
import BmiCalculatorView from "./modules/bmiCalculator/views/BmiCalculatorView.tsx";
import CurrencyExchangeView from "./modules/currencyExchange/views/CurrencyExchangeView.tsx";

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
          <Route path="bmi" element={ <BmiCalculatorView/> }/>
          <Route path="exchange" element={ <CurrencyExchangeView/> }/>
          <Route path="*" element={ <Navigate to="bmi"/> }/>
        </Route>
      ) }
    </Routes>
  );
}
