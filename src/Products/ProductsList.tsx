import { Box } from '@mui/material';
import { apiData } from '../assets/dummy';
import { useRef, useEffect, useState, MutableRefObject } from 'react';
import style from './ProductsList.module.css'

const ProductsList = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(apiData);
  }, []);

  return (
    <Box
      className={style.productsList}
    ></Box>
  );
};

export default ProductsList;
