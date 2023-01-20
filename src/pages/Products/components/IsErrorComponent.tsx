import style from './../ProductsList.module.css';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import React from 'react';

export function IsErrorComponent(props: { message: string }) {
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
        {props.message}
      </Stack>
    </Box>
  );
}
