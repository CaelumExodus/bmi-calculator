import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar.tsx";

export default function AuthorizedLayout() {


  return (
    <Box sx={ { '& .MuiButton-root': { textTransform: 'none' } } }>
      <Navbar/>

      <Container sx={ { minHeight: '100vh', padding: 0 } }>
        <Box>
          <Outlet/>
        </Box>
      </Container>
    </Box>
  );
}
