// import useGetProducts from '../../hooks/useGetProducts';
import { useProductsData } from '../../hooks/getProductsData';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CustomDialog from '../../components/CustomDialog';
import { capitalizeWord } from '../../assets/helper';
import style from './ProductsList.module.css';
import { ProductInterface } from '../../assets/helper';
import { Pagination } from './Pagination';
import { Favorites } from '../Favorites/Favorites';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  SxProps,
  Typography,
  Box,
  Snackbar,
} from '@mui/material';
import { SearchBar } from './SearchBar';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import AuthorizationContext from '../../store/authorization.context';
import { useContext } from 'react';
import React from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ProductsList = () => {
  const [count, setCount] = useState(0);
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

  if (productsList) {
    console.log(
      productsList.filter(
        (product: ProductInterface) => product.id === parseInt(id!)
      )
    );
  }
  useEffect(() => {
    console.log(count);
  }, [currentPage, count]);

  const tableContainerSx: SxProps = {
    width: '60%',
    borderRadius: 2,
    boxShadow:
      '0 0 1.5em 0 inset rgba(2, 2, 11, 1), 0 0 0.5em 0 rgba(2, 2, 11, 1)',
  };

  const [serverMsg, setServerMsg] = useState('');
  const [open, setOpen] = useState(false);
  const handleClose = (reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const pickupProduct = async (data: {
    name: string;
    id: number;
    color: string;
  }) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem('token');
    await axios
      .post(`${url}/pickup`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.message) {
          setOpen(true);
          setServerMsg(res.data.message);
        }
        if (res.data.products) {
          setProducts(res.data.products);
          localStorage.setItem('products', res.data.products);
        }
      })
      .catch((err) => {});
  };

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
    return (
      <Box className={style.productsList}>
        <Stack
          sx={{
            color: 'rgb(26, 221, 235)',
            alignItems: 'center',
            marginY: 'auto',
          }}
          spacing={2}
          direction="column"
        >
          <CircularProgress size={100} color="inherit" />
        </Stack>
      </Box>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <Box className={style.productsList}>
        <Stack
          sx={{
            color: 'rgb(26, 221, 235)',
            alignItems: 'center',
            marginY: 'auto',
          }}
          spacing={2}
          direction="column"
        >
          {error.message}
        </Stack>
      </Box>
    );
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
          <TableContainer sx={tableContainerSx}>
            <Table
              sx={{ borderCollapse: 'separate', borderSpacing: '0px px' }}
              aria-label="Products"
            >
              <TableHead
                sx={{
                  border: 0,
                  boxShadow: `0 0 0.5em 0 inset rgba(2, 2, 11, 1), 0 0 0.1em 0 rgba(2, 2, 11, 1)`,
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(9.8px)',
                }}
              >
                <TableRow>
                  <TableCell sx={{ border: 0 }} align="center">
                    Id
                  </TableCell>
                  <TableCell sx={{ border: 0 }} align="left">
                    Name
                  </TableCell>
                  <TableCell sx={{ border: 0 }} align="left">
                    Year
                  </TableCell>
                </TableRow>
              </TableHead>
              {id ? (
                <TableBody>
                  {productsList
                    .filter(
                      (product: ProductInterface) => product.id === parseInt(id)
                    )
                    .map((product: ProductInterface) => (
                      <TableRow
                        key={product.id}
                        onClick={() => {
                          setSelected(
                            productsList.find(
                              (arrayProduct: any) =>
                                arrayProduct.id === product.id
                            )
                          );
                          setDialogState(true);
                        }}
                        sx={{
                          border: 0,
                          background: `${product.color}`,
                          boxShadow: `0 0 0.5em 0 inset rgba(2, 2, 11, 1), 0 0 0.1em 0 rgba(2, 2, 11, 1)`,
                          '&:hover': {
                            cursor: 'pointer',
                            boxShadow: `0 0 1em 0 inset white, 0 0 0.1em 0 white`,
                          },
                        }}
                      >
                        <TableCell
                          sx={{ border: 0, height: 20 }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {product.id}
                        </TableCell>
                        <TableCell sx={{ border: 0 }} align="left">
                          {capitalizeWord(product.name)}
                        </TableCell>
                        <TableCell sx={{ border: 0 }} align="left">
                          {product.year}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              ) : (
                <TableBody>
                  {productsList.map((product: ProductInterface) => (
                    <TableRow
                      key={product.id}
                      onClick={() => {
                        setSelected(
                          productsList.find(
                            (arrayProduct: any) =>
                              arrayProduct.id === product.id
                          )
                        );
                        setDialogState(true);
                      }}
                      sx={{
                        border: 0,
                        background: `${product.color}`,
                        boxShadow: `0 0 0.5em 0 inset rgba(2, 2, 11, 1), 0 0 0.1em 0 rgba(2, 2, 11, 1)`,
                        '&:hover': {
                          cursor: 'pointer',
                          boxShadow: `0 0 1em 0 inset white, 0 0 0.1em 0 white`,
                        },
                      }}
                    >
                      <TableCell
                        sx={{ border: 0, height: 20 }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {product.id}
                      </TableCell>
                      <TableCell sx={{ border: 0 }} align="left">
                        {capitalizeWord(product.name)}
                      </TableCell>
                      <TableCell sx={{ border: 0 }} align="left">
                        {product.year}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
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
