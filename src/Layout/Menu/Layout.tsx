import { useState } from 'react';
import { Grid, Box } from '@mui/material';
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
      overflow: 'auto',
      minHeight: '100%',
      background: `linear-gradient(
          ${itemAngle}deg,
            rgba(31, 38, 38, 1) 0%,
            rgba(26, 64, 63, 1) 36%,
            rgba(23, 52, 75, 1) 65%,
            rgba(2, 2, 11, 1) 100%
          );`,
    };
  };

  return (
    <Box sx={gradeintSx(angle)}>
      <Grid sx={{ height: '100%', flexGrow: 1 }} container>
        <Grid item sx={{ height: '100%', flexGrow: 1 }} xs={9}>
          {props.children}
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Menu getAngle={getAngle} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
