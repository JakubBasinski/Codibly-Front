import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from '@mui/material';
import { Divider } from '@mui/material';
import { Dispatch, SetStateAction, useContext } from 'react';
import AuthorizationContext from '../store/authorization.context';
import { useDropProduct } from '../hooks/useDropProduct';
import { ProductionQuantityLimits } from '@mui/icons-material';

interface Props {
  openDialog: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  id: number;
  year?: number;
  pantone_value?: string;
  color: string;
  isFav?: boolean;
  pickupProduct?: (data: { name: string; id: number; color: string }) => {};
  setFavCount?: Dispatch<SetStateAction<number>>;
}

const CustomDialog = (props: Props) => {
  const { isLoggedIn } = useContext(AuthorizationContext);
  const { dropProduct, ...state } = useDropProduct();
  return (
    <Dialog
      open={props.openDialog}
      onClose={() => {
        props.setOpen(false);
      }}
      aria-labelledby="dialog-title"
      sx={{
        '& .MuiDialog-paper': {
          background: `${props.color}`,
          color: 'rgba(255, 255, 255, 0.37)',
          padding: '10px',
          backdropFilter: `blur(4.5px)`,
          boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`,
        },
        '& .MuiDialogContentText-root': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: `black`,
        },
        '& .MuiButtonBase-root': {
          paddingX: '20px',
          paddingY: '5px',
          color: 'black',
          textTransform: 'none',
          fontSize: '1em',
          boxShadow:
            '0 0 0.6em 0 inset rgba(2, 2, 11, 1), 0 0 0.3em 0 rgba(2, 2, 11, 1);',
          borderRadius: '5px',
        },
        '& .MuiButtonBase-root:hover': {
          transition: 'all 0.3s ease 0s',
          transform: 'translateY(-2px) scale(1.02)',
          boxShadow:
            '0 0 0.8em 0 inset rgba(2, 2, 11, 1), 0 0 0.5em 0 rgba(2, 2, 11, 1);',
        },
      }}
    >
      <DialogTitle
        sx={{
          margin: 'auto',
          fontSize: '24px',
          letterSpacing: '1px',
          fontWeight: 500,
          color: `black`,
        }}
        id="dialog-title"
      >
        {props.name.toUpperCase()}
      </DialogTitle>
      <Divider />

      {props.isFav ? (
        <Box
          sx={{
            padding: '30px 20px 20px 20px',
            gap: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            disableRipple={true}
            onClick={(e) => {
              props.setOpen(false);
            }}
            autoFocus
          >
            Close
          </Button>
          <Button
            disableRipple={true}
            onClick={(e) => {
              props.setOpen(false);
              dropProduct({
                id: props.id,
                name: props.name,
                color: props.color,
              });
            }}
            autoFocus
          >
            Drop the product
          </Button>
        </Box>
      ) : (
        <>
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '400px',
              minHeight: '100px',
            }}
          >
            <DialogContentText>Id: {props.id}</DialogContentText>
            <DialogContentText>Year: {props.year}</DialogContentText>
            <DialogContentText>
              Pantone value: {props.pantone_value}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', gap: 3 }}>
            <Button
              disableRipple={true}
              onClick={(e) => {
                props.setOpen(false);
              }}
              autoFocus
            >
              Close
            </Button>
            {isLoggedIn ? (
              <Button
                disableRipple={true}
                onClick={(e) => {
                  props.setOpen(false);
                  if (props.pickupProduct) {
                    if (true) {
                      console.log(props.setFavCount);
                    }
                    props.pickupProduct({
                      name: props.name,
                      id: props.id,
                      color: props.color,
                    });
                  }
                }}
                autoFocus
              >
                PICK ME UP !
              </Button>
            ) : null}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default CustomDialog;
