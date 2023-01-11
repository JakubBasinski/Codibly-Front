import { useState } from 'react';
import { Grid, Box} from '@mui/material';
import Menu from './Menu';

interface Props {}

const Layout = (props: React.PropsWithChildren<Props>) => {
  const [angle, setAngle] = useState(90);

  const getAngle = () => {
    setAngle((p) => p + 45);
  };

  const gradeintSx = (itemAngle: number) => {
    return {
      flexGrow: 1,
      background: `linear-gradient(
          ${itemAngle}deg,
            rgba(31, 38, 38, 1) 0%,
            rgba(26, 64, 63, 1) 36%,
            rgba(23, 52, 75, 1) 65%,
            rgba(2, 2, 11, 1) 100%
          );`,
      border: 'solid yellow 10px',
      height: '100',
    };
  };

  return (
    <Box sx={gradeintSx(angle)}>
      <Grid container>
        <Grid item sx={{ height: '100%', border: '1px solid pink' }} xs={9}>
          {props.children}
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Menu getAngle={getAngle} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
