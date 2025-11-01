import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './styles/PaletteListStyles';


class PaletteList extends Component {
  goToPalette(id) {
    this.props.navigate(`/palette/${id}`); // ✅ works in v6
  }

  render() {
    const { palettes, classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>Your Palettes</h1>
            <Link to="/palette/new">Create New</Link>
          </nav>

          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette
                key={palette.id}
                {...palette}
                handleClick={() => this.goToPalette(palette.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// ✅ Wrapper function to pass `navigate` prop to class component
const PaletteListWithNavigate = (props) => {
  const navigate = useNavigate();
  return <PaletteList {...props} navigate={navigate} />;
};

export default withStyles(styles)(PaletteListWithNavigate);
