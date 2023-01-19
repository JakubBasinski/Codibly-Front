import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useContext } from 'react';
import cls from './Favorites.module.css';
import AuthorizationContext from '../../store/authorization.context';
import { Box, Typography } from '@mui/material';
import { capitalizeWord } from '../../assets/helper';
import CustomDialog from '../../components/CustomDialog';

export const Favorites = (props: any) => {
  const { pickedUpProducts, setProducts } = useContext(AuthorizationContext);
  console.log('pickedUpProducts', pickedUpProducts);
  const favoriteListBox = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [openDialog, setOpenDialog] = useState(true);
  const [width, setWidth] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    color: string;
    name: string;
  } | null>(null);

  

  useEffect(() => {
    setWidth(
      favoriteListBox.current.scrollWidth - favoriteListBox.current.offsetWidth
    );
  }, [pickedUpProducts]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <motion.div ref={favoriteListBox} className={cls.carousel}>
        <Typography
          gutterBottom
          variant={'h5'}
          sx={{ textAlign: 'center', color: '#8db5b3' }}
        >
          Picked Products
        </Typography>
        <motion.div
          drag="x"
          whileTap={{ cursor: 'grabbing' }}
          dragConstraints={{ right: 0, left: -width }}
          className={cls.innerCarousel}
        >
          {pickedUpProducts && pickedUpProducts.length > 0 ? (
            pickedUpProducts.map((product) => {
              return (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: product.color,
                    minHeight: '50px',
                    minWidth: '160px',
                    margin: '5px',
                    marginBottom: '20px',
                    borderRadius: '5px',
                    boxShadow: `0 0 1em 0 inset black, 0 0 0.1em 0 black`,
                    '&:hover': {
                      cursor: 'pointer',
                      transition: 'all 0.3s ease 0s',
                      transform: 'translateY(-1px) scale(1.05)',
                    },
                  }}
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct({
                      id: product.id,
                      color: product.color,
                      name: product.name,
                    });
                    setOpenDialog(true);
                  }}
                >
                  {capitalizeWord(product.name)}
                </Box>
              );
            })
          ) : (
            <Typography
              gutterBottom
              variant={'h6'}
              sx={{
                textAlign: 'center',
                color: '#8db5b3',
                border: 'solid red 1px',
              }}
            >
              Pick any product !
            </Typography>
          )}
        </motion.div>
      </motion.div>
      {selectedProduct ? (
        <CustomDialog
          openDialog={openDialog}
          setOpen={setOpenDialog}
          id={selectedProduct.id}
          name={selectedProduct.name}
          color={selectedProduct.color}
          isFav={true}
        />
      ) : null}
    </Box>
  );
};
