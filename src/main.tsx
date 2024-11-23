import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router";
import AuthProvider from "./contexts/AuthContext.tsx";
import AppRoutes from "./routes.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline/>
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
