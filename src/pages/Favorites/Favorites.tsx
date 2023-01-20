import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useContext } from 'react';
import cls from './Favorites.module.css';
import AuthorizationContext from '../../store/authorization.context';
import { Box, Typography } from '@mui/material';
import { capitalizeWord } from '../../assets/helper';
import CustomDialog from '../../components/CustomDialog';
import { favProdSx } from './FavoritesSx';

export const Favorites = () => {
  const { pickedUpProducts } = useContext(AuthorizationContext);
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
                  sx={favProdSx(product.color)}
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
                margin: 'auto',
                color: '#8db5b3',
              }}
            >
              Pick up any product You like !
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
