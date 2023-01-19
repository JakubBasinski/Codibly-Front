import { useState, useContext } from 'react';
import AuthorizationContext from '../../store/authorization.context';
import { Box } from '@mui/material/';
import './Menu.css';
import { itemSx, mainCircle } from './MenuSX';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Menu = (props: any) => {
  const [selectedOption, setSelectedOption] = useState('Products');
  const { angle, changeAngle, isLoggedIn } = useContext(AuthorizationContext);

  let menuOptions: string[];
  if (!isLoggedIn) {
    menuOptions = ['Products', 'Login'];
  } else {
    menuOptions = ['Products', 'Logout'];
  }

  const navigate = useNavigate();
  const onActivate = () => {
    props.getAngle(angle);
    changeAngle();

    if (selectedOption !== 'Products') {
      navigate('./');
    } else {
      navigate('./login');
    }
  };
  useEffect(() => {}, [isLoggedIn]);

  return (
    <Box sx={{ paddingTop: '80px', textAlign: 'center' }}>
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
