import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";
import colourPalette from "../utils/colourPalette.ts";

export default function UnauthorizedLayout() {
  return (
    <Container
      sx={ { minHeight: '100vh', '& .MuiButton-root': { textTransform: 'none' }, bgcolor: colourPalette.bg } }>
      <Box sx={ { pt: 10 } }>
        <Outlet/>
      </Box>
    </Container>
  );
}
