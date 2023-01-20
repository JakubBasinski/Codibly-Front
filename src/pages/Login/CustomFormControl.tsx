import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { FormControl } from '@mui/material';
import * as cls from './AuthFormSx';

interface Props {
  isLogin: boolean;
  values: {
    name: string;
    email: string;
    password: string;
    confirmation: string;
  };
  errors: { confirmationError: boolean };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  switchAuthModeHandler: () => void;
}

export function CustomFormControl(props: Props) {
  return (
    <FormControl sx={cls.FormControlSx}>
      <Typography variant="h5" sx={cls.formSubmition}>
        {props.isLogin ? 'Login' : 'Sign up'}
      </Typography>
      {!props.isLogin && (
        <TextField
          label="Name"
          name="name"
          variant="filled"
          value={props.values.name}
          onChange={props.handleInputChange}
          sx={cls.formInputs}
          autoComplete="new-password"
          required
        />
      )}
      <TextField
        variant="filled"
        name="email"
        onChange={props.handleInputChange}
        label="Email"
        value={props.values.email}
        sx={cls.formInputs}
        type="email"
        autoComplete="new-password"
        required
      />
      <TextField
        variant="filled"
        onChange={props.handleInputChange}
        name="password"
        label="Password"
        value={props.values.password}
        inputProps={{
          type: 'password',
        }}
        sx={cls.formInputs}
        autoComplete="new-password"
        required
      />
      {!props.isLogin && (
        <TextField
          variant="filled"
          sx={cls.formInputs}
          name="confirmation"
          label="Confirm Password"
          inputProps={{
            type: 'password',
          }}
          value={props.values.confirmation}
          onChange={props.handleInputChange}
          autoComplete="new-password"
          required
          error={props.errors.confirmationError}
          helperText={
            props.errors.confirmationError && 'Passwrods does not match'
          }
        />
      )}
      <Button sx={cls.submitButton} type="submit">
        {props.isLogin ? 'Login' : 'Sign up'}
      </Button>
      <Button
        sx={cls.submitButton}
        type="button"
        onClick={props.switchAuthModeHandler}
      >
        {props.isLogin ? ' Create new account' : 'Login with existing account'}
      </Button>
    </FormControl>
  );
}
