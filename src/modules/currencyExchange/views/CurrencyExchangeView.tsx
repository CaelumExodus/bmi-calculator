import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, FormControl, FormHelperText, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import colourPalette from "../../../utils/colourPalette.ts";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";


export default function CurrencyExchangeView() {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<CurrencyFormInputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit: SubmitHandler<CurrencyFormInputs> = (data: CurrencyFormInputs) => {
    const fetchedExchangeRate = fetchExchangeRate(data.fromCurrency, data.toCurrency);
    setExchangeRate(fetchedExchangeRate);

    const converted = data.amount * fetchedExchangeRate;
    setConvertedAmount(converted);

    console.log(data);
  };

  const fetchExchangeRate = (from: string, to: string): number => {
    const rates: CurrencyRates = {
      USD: { EUR: 0.85, GBP: 0.75, HUF: 350, CZK: 22, PLN: 4.5 },
      EUR: { USD: 1.18, GBP: 0.88, HUF: 410, CZK: 24, PLN: 5.3 },
      GBP: { USD: 1.33, EUR: 1.14, HUF: 465, CZK: 28, PLN: 6.1 },
      HUF: { USD: 0.0028, EUR: 0.0024, GBP: 0.0021, CZK: 0.055, PLN: 0.013 },
      CZK: { USD: 0.045, EUR: 0.042, GBP: 0.035, HUF: 18, PLN: 0.24 },
      PLN: { USD: 0.22, EUR: 0.19, GBP: 0.16, HUF: 74, CZK: 4.2 },
    };

    return rates[from]?.[to] ?? 1;
  };

  const currencies = ['USD', 'EUR', 'GBP', 'HUF', 'CZK', 'PLN'];

  return (
    <Box>
      <Box component='form' onSubmit={ handleSubmit(onSubmit) } sx={ {
        padding: 2,
        borderRadius: 1,
        boxShadow: 3,
        maxWidth: 400,
        margin: "auto",
      } }>
        <FormControl fullWidth sx={ { mb: 2 } } error={ !!errors.fromCurrency }>
          <Typography sx={ { fontSize: '12px', color: 'rgba(0, 0, 0, 0.6)' } }>Z waluty</Typography>
          <Select variant='standard' defaultValue='PLN' { ...register('fromCurrency') } label="From Currency">
            { currencies.map((currency) => (
              <MenuItem key={ currency } value={ currency }>
                { currency }
              </MenuItem>
            )) }
          </Select>
          { errors.fromCurrency && <FormHelperText>{ errors.fromCurrency.message }</FormHelperText> }
        </FormControl>

        <FormControl fullWidth sx={ { mb: 2 } } error={ !!errors.toCurrency }>
          <Typography sx={ { fontSize: '12px', color: 'rgba(0, 0, 0, 0.6)' } }>Do waluty</Typography>
          <Select variant='standard' defaultValue='EUR' { ...register('toCurrency') } label="To Currency">
            { currencies.map((currency) => (
              <MenuItem key={ currency } value={ currency }>
                { currency }
              </MenuItem>
            )) }
          </Select>
          { errors.toCurrency && <FormHelperText>{ errors.toCurrency.message }</FormHelperText> }
        </FormControl>

        <TextField
          { ...register('amount') }
          label="Wartość"
          type="number"
          variant='standard'
          fullWidth
          error={ !!errors.amount }
          helperText={ errors.amount ? errors.amount.message : '' }
          sx={ { mb: 2 } }
        />

        <Button type="submit" variant="contained" sx={ { bgcolor: colourPalette.primary } } fullWidth>
          Sprawdź kurs
        </Button>

        { exchangeRate !== null && (
          <Box sx={ { mt: 2 } }>
            <Typography variant="body1">
              Kurs: { exchangeRate.toFixed(4) } { `(${ getValues('fromCurrency') } do ${ getValues('toCurrency') })` }
            </Typography>
            { convertedAmount !== null && (
              <Typography sx={ { mt: 0.5 } } variant="body2">
                Przeliczona kwota : { convertedAmount.toFixed(2) } { getValues('toCurrency') }
              </Typography>
            ) }
          </Box>
        ) }
      </Box>
    </Box>
  );
}

type CurrencyFormInputs = {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
};

type CurrencyRates = {
  [key: string]: {
    [key: string]: number;
  };
};

const validationSchema = yup.object().shape({
  amount: yup.number()
    .required('Pole wymagane')
    .moreThan(0.01, 'Wartość musi być większa niż 0.01')
    .typeError('Wartość musi być liczbą'),

  fromCurrency: yup.string().required('Pole wymagane'),

  toCurrency: yup.string().required('Pole wymagane'),
});

