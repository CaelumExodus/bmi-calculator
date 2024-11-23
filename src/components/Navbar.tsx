import { AppBar, Box, Button, Container, Divider, Toolbar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext.tsx";
import { Link } from "react-router";

export default function Navbar() {
  const { logout } = useAuth();

  return <AppBar position="sticky" sx={ { bgcolor: 'inherit', boxShadow: 'none' } }>
    <Container sx={ { p: 0 } }>

      <Toolbar sx={ { p: { xs: 0 }, color: 'black' } }>

        <Box sx={ { display: 'flex', justifyContent: 'space-between', width: '100%' } }>
          <Box sx={ { display: 'flex' } }>
            <Button color="inherit" component={ Link } to='/bmi'>
              Kalkulator BMI
            </Button>
            <Divider orientation='vertical' sx={ { mx: 1, bgcolor: 'darkGrey' } }/>
            <Button color="inherit" component={ Link } to='/exchange'>
              Kursy walut
            </Button>
          </Box>
          <Button color="inherit" onClick={ logout }>
            Wyloguj
          </Button>
        </Box>


      </Toolbar>
    </Container>
  </AppBar>

}