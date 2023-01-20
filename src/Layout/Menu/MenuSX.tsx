export const itemSx = (itemAngle: number) => {
  return {
    background: 'transparent',
    position: 'absolute',
    color: '#19dcea',
    textShadow: ' 0 0 0.125em rgba(255, 255, 255, 0.315), 0 0 0.25em #19dcea',
    width: '100px',
    height: '60px',
    transition: 'transform 1s ease-in-out',
    boxShadow: '0 0 1.5em 0 inset #19dcea , 0 0 0.5em 0  #19dcea',
    borderRadius: '0.25em',
    left: '150px',
    top: '170px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: `rotate(${itemAngle}deg) translateY(-170px)  ${
      itemAngle === 0 || itemAngle % 360 === 0 ? 'scale(1)' : 'scale(1)'
    } `,
  };
};

export const mainCircle = {
  width: '400px',
  height: '400px',
  transform: ' rotate(0deg)',
};

export const gradeintSx = (itemAngle: number) => {
  return {
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    background: `linear-gradient(
        ${itemAngle}deg,
          rgba(31, 38, 38, 1) 0%,
          rgba(26, 64, 63, 1) 36%,
          rgba(23, 52, 75, 1) 65%,
          rgba(2, 2, 11, 1) 100%
        );`,
  };
};
