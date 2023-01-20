export const FormControlSx = {
  width: '100%',
  gap: 3,
  justifyContent: 'center',
  alignItems: 'center',
  paddingY: '50px',
  borderRadius: '10px',
  color: 'grey',
  backdropFilter: 'invert(10%)',
};

export const formSubmition = {
  paddingBottom: 1,
  paddingLeft: 1.1,
  color: '#8db5b3',
  letterSpacing: 2,
  fontSize: '1.6em',
  fontWeight: 600,
};

export const formInputs = {
  width: '60%',
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
};

export const submitButton = {
  paddingX: '20px',
  paddingY: '5px',
  color: '#8db5b3',
  textTransform: 'none',
  fontSize: '1em',
  boxShadow:
    '0 0 1em 0 inset rgba(2, 2, 11, 1), 0 0 0.5em 0 rgba(2, 2, 11, 1);',
  borderRadius: '5px',
  '&:hover': {
    color: 'gold',
    textShadow: '1px 1px 2px rgb(0,0,0)',
    transition: 'all 0.3s ease 0s',
    transform: 'translateY(-1px)',
  },
};

export const logoutButton = {
  ...submitButton,
  marginY: 'auto',
  paddingX: '40px',
  paddingY: '10px',
  '&:hover': {
    color: '#AB2328',
    textShadow: '1px 1px 1px rgb(0,0,0)',
    transition: 'all 0.3s ease 0s',
    transform: 'translateY(-1px)',
  },
};
