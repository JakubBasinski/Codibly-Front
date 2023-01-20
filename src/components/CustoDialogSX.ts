export const DialogSx = (color: string) => {
  return {
    '& .MuiDialog-paper': {
      background: `${color}`,
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
  };
};

export const DialogTitleSx = {
  margin: 'auto',
  fontSize: '24px',
  letterSpacing: '1px',
  fontWeight: 500,
  color: `black`,
};

export const DialogBox = {
  padding: '30px 20px 20px 20px',
  gap: 2,
  display: 'flex',
  justifyContent: 'center',
};

export const DialogContent = {
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
  minHeight: '100px',
};
