import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";

export default function UnauthorizedLayout() {
  return (
    <Container sx={ { minHeight: '100vh' } }>
      <Box sx={ { mt: 10 } }>
        <Outlet/>
      </Box>
    </Container>
  );
}
