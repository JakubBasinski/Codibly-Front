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
import * as style from './CustoDialogSX';

interface Props {
  openDialog: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  id: number;
  pantone_value?: string;
  color: string;
  isFav?: boolean;
  pickupProduct?: (data: { name: string; id: number; color: string }) => {};
  setFavCount?: Dispatch<SetStateAction<number>>;
  year?: number;
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
      sx={style.DialogSx(props.color)}
    >
      <DialogTitle sx={style.DialogTitleSx} id="dialog-title">
        {props.name.toUpperCase()}
      </DialogTitle>
      <Divider />

      {props.isFav ? (
        <Box
          sx={style.DialogBox}
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
            sx={style.DialogContent}
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
