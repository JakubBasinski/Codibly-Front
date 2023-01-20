// import useGetProducts from '../../hooks/useGetProducts';
import { useProductsData } from '../../hooks/getProductsData';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CustomDialog from '../../components/CustomDialog';
import style from './ProductsList.module.css';
import { ProductInterface } from '../../assets/helper';
import { Pagination } from './components/Pagination';
import { Favorites } from '../Favorites/Favorites';
import { Typography, Box, Snackbar } from '@mui/material';
import { SearchBar } from './components/SearchBar';
import AuthorizationContext from '../../store/authorization.context';
import { useContext } from 'react';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { IsLoadingComponent } from './components/IsLoadingComponent';
import { IsErrorComponent } from './components/IsErrorComponent';
import { TableContainerComponent } from './components/TableContainerComponent';
import { usePickupProduct } from '../../hooks/usePickupProduct';

const ProductsList = () => {
  const { isLoggedIn, setProducts } = useContext(AuthorizationContext);
  const { page, id } = useParams();
  const { isLoading, isError, error, data: apiData } = useProductsData(page);
  const productsList = apiData?.data.data.slice(0, 5);
  const [openDialog, setDialogState] = useState(false);
  const [selectedProduct, setSelected] = useState<
    ProductInterface | null | undefined
  >(null);
  const [searchInput, setSearchInput] = useState<string | number | null>('');
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page!));

  useEffect(() => {}, [currentPage]);

  const [serverMsg, setServerMsg] = useState('');
  const [open, setOpen] = useState(false);
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const pickupProduct = usePickupProduct(setOpen, setServerMsg, setProducts);

  const action = (
    <Box>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        type="button"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  if (isLoading) {
    return <IsLoadingComponent></IsLoadingComponent>;
  }

  if (isError && error instanceof Error) {
    return <IsErrorComponent message={error.message}></IsErrorComponent>;
  }

  return (
    <React.Fragment>
      <Box className={style.productsList}>
        <SearchBar
          products={productsList}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        ></SearchBar>
        {productsList.length < 1 ? (
          <Box sx={{ height: '100px', display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ color: '#8db5b3' }} variant={'h3'}>
              No products found
            </Typography>
          </Box>
        ) : (
          <TableContainerComponent
            id={id}
            productsList={productsList}
            setDialogState={setDialogState}
            setSelected={setSelected}
          ></TableContainerComponent>
        )}

        <Pagination
          onNextPage={() => {
            setCurrentPage((prev) => prev! + 1);
          }}
          onPrevPage={() => {
            setCurrentPage((prev) => prev! - 1);
          }}
          currentPage={currentPage}
          totalPages={2}
          limit={5}
        />

        {selectedProduct ? (
          <CustomDialog
            openDialog={openDialog}
            setOpen={setDialogState}
            id={selectedProduct.id}
            name={selectedProduct.name}
            year={selectedProduct.year}
            color={selectedProduct.color}
            pantone_value={selectedProduct.pantone_value}
            pickupProduct={pickupProduct}
          />
        ) : null}
      </Box>
      {isLoggedIn ? <Favorites /> : null}

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={serverMsg}
        action={action}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
      />
    </React.Fragment>
  );
};

export default ProductsList;


