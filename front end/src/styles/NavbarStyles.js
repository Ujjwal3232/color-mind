const styles = {
  '@global': {
    '@import': "url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Pacifico&family=Poppins:wght@100..900&family=Source+Sans+3:wght@200..900&display=swap')",
  },

  Navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '6vh',
  },

  logo: {
    marginRight: '15px',
    padding: '0 13px',
    fontSize: '22px',
    backgroundColor: '#eceff1',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    height: '100%',
    display: 'flex',
    alignItems: 'center',

    '& a': {
      textDecoration: 'none',
      color: 'black',
      display: 'flex',
      alignItems: 'center',
    },
  },

  logoImg: {
    height: '45px',
    width: '45px',
    objectFit: 'contain',
    marginRight: '8px',
    verticalAlign: 'middle',
    borderRadius: '25%',
  },

  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '1rem',

    '& span': {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 500,
      fontSize: '14px',
    },
  },

  slider: {
    width: '340px',
    margin: '0 10px',
    display: 'inline-block',

    '& .rc-slider-track': {
      backgroundColor: 'green',
    },

    '& .rc-slider-rail': {
      height: '5px',
    },

    '& .rc-slider-handle, & .rc-slider-handle:active, & .rc-slider-handle:focus, & .rc-slider-handle:hover': {
      backgroundColor: 'green',
      outline: 'none',
      border: '2px solid green',
      boxShadow: 'none',
      width: '13px',
      height: '13px',
      marginLeft: '-6px',
      marginTop: '-4px',
    },
  },

  selectContainer: {
    marginLeft: 'auto',
    marginRight: '1rem',
  },
};

export default styles;
