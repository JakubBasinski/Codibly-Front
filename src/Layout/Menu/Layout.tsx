import { useState } from 'react';
import { Grid, Box } from '@mui/material';
import Menu from './Menu';
import { gradeintSx } from './MenuSX';

interface Props {}

const Layout = (props: React.PropsWithChildren<Props>) => {
  const [angle, setAngle] = useState(90);

  const getAngle = () => {
    setAngle((p) => p + 45);
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
