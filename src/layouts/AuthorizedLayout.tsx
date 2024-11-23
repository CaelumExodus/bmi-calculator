import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar.tsx";
import colourPalette from "../utils/colourPalette.ts";

export default function AuthorizedLayout() {


  return (
    <Box sx={ { '& .MuiButton-root': { textTransform: 'none' }, bgcolor: colourPalette.bg } }>
      <Navbar/>

      <Container sx={ { mt: 5, pb: 5 } }>
        <Box>
          <Outlet/>
        </Box>
      </Container>
    </Box>
  );
}
