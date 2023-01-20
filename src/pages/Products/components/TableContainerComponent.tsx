import { capitalizeWord } from '../../../assets/helper';
import { ProductInterface } from '../../../assets/helper';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface Props {
  id: string | undefined;
  productsList: ProductInterface[];
  setDialogState: (arg: boolean) => void;
  setSelected: (product: ProductInterface | undefined) => void;
}

export function TableContainerComponent(props: Props) {
  return (
    <TableContainer
      sx={{
        width: '60%',
        borderRadius: 2,
        boxShadow:
          '0 0 1.5em 0 inset rgba(2, 2, 11, 1), 0 0 0.5em 0 rgba(2, 2, 11, 1)',
      }}
    >
      <Table
        sx={{
          borderCollapse: 'separate',
          borderSpacing: '0px px',
        }}
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
            <TableCell
              sx={{
                border: 0,
              }}
              align="center"
            >
              Id
            </TableCell>
            <TableCell
              sx={{
                border: 0,
              }}
              align="left"
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                border: 0,
              }}
              align="left"
            >
              Year
            </TableCell>
          </TableRow>
        </TableHead>
        {props.id ? (
          <TableBody>
            {props.productsList
              .filter(
                (product: ProductInterface) =>
                  product.id === parseInt(props.id!)
              )
              .map((product: ProductInterface) => (
                <TableRow
                  key={product.id}
                  onClick={() => {
                    props.setSelected(
                      props.productsList.find(
                        (arrayProduct) => arrayProduct.id === product.id
                      )
                    );
                    props.setDialogState(true);
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
                    sx={{
                      border: 0,
                      height: 20,
                    }}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    {product.id}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: 0,
                    }}
                    align="left"
                  >
                    {capitalizeWord(product.name)}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: 0,
                    }}
                    align="left"
                  >
                    {product.year}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        ) : (
          <TableBody>
            {props.productsList.map((product: ProductInterface) => (
              <TableRow
                key={product.id}
                onClick={() => {
                  props.setSelected(
                    props.productsList.find(
                      (arrayProduct: ProductInterface) =>
                        arrayProduct.id === product.id
                    )
                  );
                  props.setDialogState(true);
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
                  sx={{
                    border: 0,
                    height: 20,
                  }}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {product.id}
                </TableCell>
                <TableCell
                  sx={{
                    border: 0,
                  }}
                  align="left"
                >
                  {capitalizeWord(product.name)}
                </TableCell>
                <TableCell
                  sx={{
                    border: 0,
                  }}
                  align="left"
                >
                  {product.year}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
