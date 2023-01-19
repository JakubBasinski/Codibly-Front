import { TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductInterface } from '../../assets/helper';

interface SerchBarProps {
  products: ProductInterface[];
  searchInput: string | number | null;
  setSearchInput: React.Dispatch<React.SetStateAction<string | number | null>>;
}

export function SearchBar(props: SerchBarProps) {
  const { page } = useParams();
  const navigate = useNavigate();

  return (
    <TextField
      type="number"
      label="Enter Id"
      name="name"
      variant="filled"
      value={props.searchInput}
      onChange={(e) => {
        navigate(`/page/${page}/id/${e.target.value}`);
        props.products.filter(
          (product) => product.id === parseInt(e.target.value)
        );
        props.setSearchInput(e.target.value);
      }}
      sx={{
        width: '20%',
        '& .MuiFilledInput-input': {
          color: 'rgb(26, 221, 235)',
          fontSize: '1.1em',
        },
        '& .MuiFormLabel-root ': {
          color: '#8db5b3',
        },
        '& label.Mui-focused': {
          color: 'rgb(26, 221, 235)',
        },
        '& .MuiFilledInput-underline:before': {
          borderBottomColor: '#8db5b3',
        },
        '& .MuiFilledInput-underline:after': {
          borderBottomColor: 'rgb(26, 221, 235)',
        },
        marginBottom: '20px',
      }}
      autoComplete="off"
    />
  );
}
