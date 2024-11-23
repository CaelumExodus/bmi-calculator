import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";

export default function UnauthorizedLayout() {
  return (
    <Container>
      <Box>
        <Outlet/>
      </Box>
    </Container>
  );
}
