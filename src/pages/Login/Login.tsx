import { Box } from '@mui/material';
import style from '../Products/ProductsList.module.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorizationContext from '../../store/authorization.context';
import {
  Grid,
  Button,
  TextField,
  Typography,
  Snackbar,
  IconButton,
} from '@mui/material';
import { FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as cls from './AuthFormSx';
import axios from 'axios';

export const initialFieldValues = {
  name: '',
  email: '',
  password: '',
  confirmation: '',
};

export const errorsFieldValues = {
  confirmationError: false,
};

export const LoginPage = () => {
  const { login, isLoggedIn, logout, setProducts } =
    useContext(AuthorizationContext);
  const [serverMsg, setServerMsg] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState(errorsFieldValues);
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setValues(initialFieldValues);
    setErrors(errorsFieldValues);
  };

  const [open, setOpen] = useState(false);
  const handleClose = (reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <Box>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        type="button"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const data = JSON.stringify({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    const url = import.meta.env.VITE_BACKEND_URL;

    let endpoint;

    if (isLogin) {
      endpoint = 'login';
    } else {
      endpoint = 'signup';
    }

    if (!isLogin && values.password !== values.confirmation) {
      setErrors({
        ...errors,
        confirmationError: true,
      });
      return;
    }

    await axios
      .post(`${url}/${endpoint}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setValues(initialFieldValues);
        if (res.data && isLogin) { 
          login(res.data.token, res.data.userId);
          setProducts(res.data.products);
          navigate('/page/1');
        } else if (res.data && !isLogin) {
          setIsLogin(true);
        } else {
          setServerMsg(res.data.message);
          setOpen(true);
        }
      })
      .catch((err) => {
        setServerMsg(err.response.data.message);
        setOpen(true);
      });
  };

  if (isLoggedIn) {
    return (
      <Box className={style.productsList}>
        <Button
          onClick={() => {
            logout();
            navigate('/page/1');
          }}
          sx={cls.logoutButton}
          type="button"
        >
          Logout
        </Button>
      </Box>
    );
  }

  return (
    <Box className={style.productsList}>
      <Grid container justifyContent="center">
        <Grid item md={4} justifyContent="center">
          <form onSubmit={submitHandler}>
            <FormControl sx={cls.FormControlSx}>
              <Typography variant="h5" sx={cls.formSubmition}>
                {isLogin ? 'Login' : 'Sign up'}
              </Typography>
              {!isLogin && (
                <TextField
                  label="Name"
                  name="name"
                  variant="filled"
                  value={values.name}
                  onChange={handleInputChange}
                  sx={cls.formInputs}
                  autoComplete="new-password"
                  required
                />
              )}
              <TextField
                variant="filled"
                name="email"
                onChange={handleInputChange}
                label="Email"
                value={values.email}
                sx={cls.formInputs}
                type="email"
                autoComplete="new-password"
                required
              />
              <TextField
                variant="filled"
                onChange={handleInputChange}
                name="password"
                label="Password"
                value={values.password}
                inputProps={{
                  type: 'password',
                }}
                sx={cls.formInputs}
                autoComplete="new-password"
                required
              />
              {!isLogin && (
                <TextField
                  variant="filled"
                  sx={cls.formInputs}
                  name="confirmation"
                  label="Confirm Password"
                  inputProps={{
                    type: 'password',
                  }}
                  value={values.confirmation}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  required
                  error={errors.confirmationError}
                  helperText={
                    errors.confirmationError && 'Passwrods does not match'
                  }
                />
              )}
              <Button sx={cls.submitButton} type="submit">
                {isLogin ? 'Login' : 'Sign up'}
              </Button>
              <Button
                sx={cls.submitButton}
                type="button"
                onClick={switchAuthModeHandler}
              >
                {isLogin
                  ? ' Create new account'
                  : 'Login with existing account'}
              </Button>
            </FormControl>
          </form>
        </Grid>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message={serverMsg}
          action={action}
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'bottom',
          }}
        />
      </Grid>
    </Box>
  );
};
