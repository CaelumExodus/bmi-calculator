import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import colourPalette from "../../../utils/colourPalette.ts";

export default function BmiCalculatorView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      height: 0,
      weight: 0,
    }
  });


  const [bmi, setBmi] = React.useState<number | null>(null);
  const [category, setCategory] = React.useState<string>("");


  const calculateBmi = (data: IFormInputs): void => {
    const heightInMeters: number = data.height / 100;
    const bmiValue: number = data.weight / (heightInMeters * heightInMeters);
    setBmi(parseFloat(bmiValue.toFixed(2)));
    setCategory(getBmiCategory(bmiValue));
  };


  const getBmiCategory = (bmiValue: number): string => {
    if (bmiValue < 18.5) return "Niedowaga";
    if (bmiValue >= 18.5 && bmiValue < 24.9) return "Prawidłowa waga";
    if (bmiValue >= 25 && bmiValue < 29.9) return "Nadwaga";
    if (bmiValue >= 30 && bmiValue < 34.99) return "Otyłość I stopnia";
    return "Otyłość II stopnia";
  };

  return (
    <Box
      sx={ {
        padding: 2,
        borderRadius: 1,
        boxShadow: 3,
        maxWidth: 400,
        margin: "auto",
      } }
    >
      <Typography variant="h5" sx={ { marginBottom: 2 } }>
        Oblicz BMI
      </Typography>

      <TextField
        { ...register("weight") }
        label="Waga (kg)"
        variant="standard"
        margin='normal'
        type="number"
        fullWidth
        sx={ { marginBottom: 2 } }
        error={ !!errors.weight }
        helperText={ errors.weight?.message }
      />

      <TextField
        { ...register("height") }
        label="Wzrost (cm)"
        variant="standard"
        margin='normal'
        type="number"
        fullWidth
        sx={ { marginBottom: 2 } }
        error={ !!errors.height }
        helperText={ errors.height?.message }
      />

      <Button
        sx={ { mt: 2, bgcolor: colourPalette.primary } }
        variant="contained"
        onClick={ handleSubmit(calculateBmi) }
        fullWidth
      >
        Oblicz BMI
      </Button>

      { bmi !== null && (
        <Box sx={ { marginTop: 2, textAlign: "center", } }>
          <Typography variant="h6">Twoje BMI Wynosi: <b>{ bmi }</b></Typography>
          <Typography variant="body1" color="textSecondary">
            Kategoria: <b>{ category }</b>
          </Typography>
        </Box>
      ) }
    </Box>
  );
}

const validationSchema = Yup.object({
  weight: Yup.number().required("Wymagane").min(1, "Wartość musi być większa od 0"),
  height: Yup.number().required("Wymagane").min(1, "Wartość musi być większa od 0"),
});

interface IFormInputs {
  weight: number;
  height: number;
}

