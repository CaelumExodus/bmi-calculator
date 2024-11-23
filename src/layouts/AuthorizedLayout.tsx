import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar.tsx";
import colourPalette from "../utils/colourPalette.ts";

export default function AuthorizedLayout() {


  return (
    <Box sx={ { '& .MuiButton-root': { textTransform: 'none' }, bgcolor: colourPalette.bg } }>
      <Navbar/>

      <Container sx={ { minHeight: '100vh', padding: 0, mt: 5 } }>
        <Box>
          <Outlet/>
        </Box>
      </Container>
    </Box>
  );
}
