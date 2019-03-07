import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import HeadsetIcon from '@material-ui/icons/Headset';
import MusicNote from '@material-ui/icons/MusicNote';
import SpeakerIcon from '@material-ui/icons/Speaker';
import RadioIcon from '@material-ui/icons/Radio';
import SettingsIcon from '@material-ui/icons/Settings';

import DeezerMusicComponent from '../DeezerMusicComponent';
import SoundcloudMusicComponent from '../SoundcloudMusicComponent';
import CustomRadioComponent from '../CustomRadioComponent';
import AboutComponent from '../AboutComponent';

const drawerValues = ['Deezer Music', 'Soundcloud Music', 'Custom Radio', 'About'];

class RootComponent extends React.Component {
  state = {
    toolBarText: drawerValues[0],
    pageNumber: 0,
  };

  componentDidMount() {
    document.getElementById("dz-root").click();
  }

  handleDrawerClick = (pageNumber) => {
    this.setState({
      toolBarText: drawerValues[pageNumber],
      pageNumber,
    });
  };

  render() {
    const { classes } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar}>
            <List>
              <ListItem key='Rocket Player'>
                <Avatar className={classes.orangeAvatar}>
                  <MusicNote />
                </Avatar>
                <ListItemText primary='Rocket Player' />
              </ListItem>
            </List>
        </div>
        <Divider />
        <List>
          <ListItem button key={drawerValues[0]} onClick={() => this.handleDrawerClick(0)}>
            <ListItemIcon>
              <HeadsetIcon />
            </ListItemIcon>
            <ListItemText primary={drawerValues[0]} />
          </ListItem>
          <ListItem button key={drawerValues[1]} onClick={() => this.handleDrawerClick(1)}>
            <ListItemIcon>
              <SpeakerIcon />
            </ListItemIcon>
            <ListItemText primary={drawerValues[1]} />
          </ListItem>
          <ListItem button key={drawerValues[2]} onClick={() => this.handleDrawerClick(2)}>
            <ListItemIcon>
              <RadioIcon />
            </ListItemIcon>
            <ListItemText primary={drawerValues[2]} />
          </ListItem>
          <ListItem button key={drawerValues[3]} onClick={() => this.handleDrawerClick(3)}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={drawerValues[3]} />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              {this.state.toolBarText}
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.state.pageNumber === 0 && <DeezerMusicComponent />}
          {this.state.pageNumber === 1 && <SoundcloudMusicComponent />}
          {this.state.pageNumber === 2 && <CustomRadioComponent />}
          {this.state.pageNumber === 3 && <AboutComponent />}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RootComponent);