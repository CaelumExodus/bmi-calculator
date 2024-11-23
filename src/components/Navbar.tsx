import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext.tsx";

export default function Navbar() {
  const { logout } = useAuth();

  return <AppBar position="sticky" sx={ { bgcolor: 'inherit', boxShadow: 'none' } }>
    <Container sx={ { p: 0 } }>

      <Toolbar sx={ { p: { xs: 0 }, color: 'black', display: 'flex', justifyContent: 'right' } }>

        <Button color="inherit" onClick={ logout }>
          Wyloguj
        </Button>
      </Toolbar>
    </Container>
  </AppBar>

}