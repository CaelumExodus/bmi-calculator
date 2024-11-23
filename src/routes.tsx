import UnauthorizedLayout from "./layouts/UnauthorizedLayout";
import AuthorizedLayout from "./layouts/AuthorizedLayout";
import { useAuth } from "./contexts/AuthContext";
import { Navigate, Route, Routes } from "react-router";
import { Box } from "@mui/material";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      { !isAuthenticated && (
        <Route path="/" element={ <UnauthorizedLayout/> }>
          <Route path="login" element={ <Box>LOGIN</Box> }/>
          <Route path="*" element={ <Navigate to="/login"/> }/>
        </Route>
      ) }

      { isAuthenticated && (
        <Route path="/" element={ <AuthorizedLayout/> }>
          <Route path="protected" element={ <Box>PROTECTED</Box> }/>
          <Route path="*" element={ <Navigate to="/protected"/> }/>
        </Route>
      ) }
    </Routes>
  );
}
