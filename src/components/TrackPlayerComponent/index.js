import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

class TrackPlayerComponent extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <AppBar position="fixed" color="default" className={classes.footerAppBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <IconButton color="inherit">
                <SearchIcon />
              </IconButton>
              <IconButton color="inherit">
                <MoreIcon />
              </IconButton>
              <IconButton color="inherit" disabled>
                <MoreIcon />
              </IconButton>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TrackPlayerComponent);
