import style from './../ProductsList.module.css';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

export function IsLoadingComponent() {
  return (
    <Box className={style.productsList}>
      <Stack
        sx={{
          color: 'rgb(26, 221, 235)',
          alignItems: 'center',
          marginY: 'auto',
        }}
        spacing={2}
        direction="column"
      >
        <CircularProgress size={100} color="inherit" />
      </Stack>
    </Box>
  );
}
