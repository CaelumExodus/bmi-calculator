import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router";
import AuthProvider from "./contexts/AuthContext.tsx";
import AppRoutes from "./routes.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={ theme }>
      <CssBaseline/>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>

  </StrictMode>,
)


