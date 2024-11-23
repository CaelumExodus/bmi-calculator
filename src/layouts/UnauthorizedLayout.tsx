import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";
import colourPalette from "../utils/colourPalette.ts";

export default function UnauthorizedLayout() {
  return (
    <Container
      sx={ { '& .MuiButton-root': { textTransform: 'none' }, bgcolor: colourPalette.bg } }>
      <Box sx={ { py: 5 } }>
        <Outlet/>
      </Box>
    </Container>
  );
}
