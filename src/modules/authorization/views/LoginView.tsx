import { Box, Button, Card, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from "../../../contexts/AuthContext.tsx";
import { useNavigate } from "react-router";
import colourPalette from "../../../utils/colourPalette.ts";

export default function LoginView() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    if (data.username === 'test' && data.password === 'test') {
      login();
      navigate('/');
    } else {
      alert('niepoprawne dane logowania');
    }

  };

  return (
    <Card
      sx={ {
        maxWidth: 450,
        margin: 'auto',
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: 'inherit'
      } }
    >
      <Typography sx={ { textAlign: 'center' } } variant='h4'>Zaloguj się</Typography>

      <Box component='form' onSubmit={ handleSubmit(onSubmit) }>

        <TextField
          fullWidth
          label="Login: test"
          variant="standard"
          margin='normal'
          { ...register('username') }
          error={ !!errors.username }
          helperText={ errors.username?.message }
        />

        <TextField
          fullWidth
          label="Hasło: test"
          type="password"
          variant="standard"
          margin='normal'
          { ...register('password') }
          error={ !!errors.password }
          helperText={ errors.password?.message }
        />
        <Button
          sx={ { mt: 3, bgcolor: colourPalette.primary, color: '#FFFFFF' } }
          fullWidth
          type="submit"
        >
          Zaloguj
        </Button>
      </Box>
    </Card>
  );
}

interface LoginFormData {
  username: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup
    .string()
    .required('LoginView jest wymagany'),
  password: yup
    .string()
    .required('Hasło jest wymagane'),
}).required();
