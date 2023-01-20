export const favProdSx = (color: string) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: color,
    minHeight: '50px',
    minWidth: '160px',
    margin: '5px',
    marginBottom: '20px',
    borderRadius: '5px',
    boxShadow: `0 0 1em 0 inset black, 0 0 0.1em 0 black`,
    '&:hover': {
      cursor: 'pointer',
      transition: 'all 0.3s ease 0s',
      transform: 'translateY(-1px) scale(1.05)',
    },
  };
};
