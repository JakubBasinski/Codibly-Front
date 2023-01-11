import { useState } from 'react';
import { Box } from '@mui/material/';
import './Menu.css';
import { itemSx, mainCircle } from './MenuSX';

const menuOptions = ['Login', 'Products',];

const Menu = (props: any) => {
  const [selectedOption, setSelectedOption] = useState('Login');
  const [angle, setAngle] = useState(0);
  const onActivate = () => {
    setAngle((p) => p + 180);
    props.getAngle(angle);
  };
  return (
    <Box sx={{ paddingTop: '80px', textAlign: 'center',  }}>
      <Box sx={mainCircle}>
        {menuOptions.map((option, index) => (
          <Box
            onTransitionEnd={() => {
              angle + index * 180 === 0 || (angle + index * 180) % 360 === 0
                ? setSelectedOption(option)
                : null;
            }}
            key={index}
            sx={itemSx(angle + index * 180)}
          >
            {option}
          </Box>
        ))}
      </Box>
      <button className="animate__button" onClick={onActivate}>
        {selectedOption}
      </button>
    </Box>
  );
};

export default Menu;
