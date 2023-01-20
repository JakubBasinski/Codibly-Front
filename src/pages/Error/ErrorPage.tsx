import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <Box
      sx={{
        margin: '120px',
      }}
    >
      <Typography sx={{ fontSize: '80px' }}>404 </Typography>
      <Typography sx={{ fontSize: '80px' }}>Page not found </Typography>

      <Link to="/page/1">
        <Typography sx={{ fontSize: '40px' }}>Home Page </Typography>
      </Link>
    </Box>
  );
};
