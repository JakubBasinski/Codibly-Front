import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
interface Props {
  currentPage: number;
  totalPages: number;
  limit: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}
export const Pagination = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: Props) => {
  const navigation = useNavigate();
  return (
    <>
      <Box
        sx={{
          marginTop: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Button
          sx={{ color: '#8db5b3' }}
          disabled={currentPage === 1}
          onClick={() => {
            onPrevPage();
            navigation(`/page/${currentPage - 1}`);
          }}
        >
          <KeyboardDoubleArrowLeftIcon />
        </Button>
        <Typography
          sx={{
            color: '#8db5b3',
            padding: '5px 10px',
            border: 'solid 1px #8db5b3',
          }}
        >
          {currentPage}
        </Typography>
        <Button
          disabled={currentPage >= totalPages}
          sx={{ color: '#8db5b3' }}
          onClick={() => {
            onNextPage();
            navigation(`/page/${currentPage + 1}`);
          }}
        >
          <KeyboardDoubleArrowRightIcon />
        </Button>
      </Box>
    </>
  );
};
