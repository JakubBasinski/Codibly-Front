import { Box } from '@mui/material';
import style from '../Products/ProductsList.module.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorizationContext from '../../store/authorization.context';
import {
  Grid,
  Button,
  Snackbar,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as cls from './AuthFormSx';
import axios from 'axios';
import { CustomFormControl } from './CustomFormControl';
import { initialFieldValues, errorsFieldValues } from './AuthHelpers';


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
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
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
            <CustomFormControl
              isLogin={isLogin}
              values={values}
              errors={errors}
              handleInputChange={handleInputChange}
              switchAuthModeHandler={switchAuthModeHandler}
            ></CustomFormControl>
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
