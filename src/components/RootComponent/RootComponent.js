import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import HeadsetIcon from '@material-ui/icons/Headset';
import MusicNote from '@material-ui/icons/MusicNote';
import SpeakerIcon from '@material-ui/icons/Speaker';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';

import DeezerMusicComponent from '../DeezerMusicComponent';
import SoundcloudMusicComponent from '../SoundcloudMusicComponent';
import AboutComponent from '../AboutComponent';
import ArtistComponent from '../ArtistComponent';
import AlbumComponent from '../AlbumComponent';
import TrackPlayerComponent from '../TrackPlayerComponent';
import PlaylistsComponent from '../PlaylistsComponent';
import PlaylistComponent from '../PlaylistComponent';

const drawerValues = ["Deezer", "Soundcloud", "About", "Artist", "Album", "Playlists", "Playlist"];

class RootComponent extends React.Component {
  state = {
    toolBarText: drawerValues[0],
    pageNumber: 0,
    isAuthUser: false,
    anchorEl: null,
    userAccount: {},
    searchResults: {
      deezer: {
        artists: [],
        albums: [],
        tracks: [],
      },
      soundcloud: {
        users: [],
        playlists: [],
        tracks: [],
      }
    },
    isPlaying: false,
    playingId: '',
    albumOrArtistInfo: {},
    playlistInfo: {},
  };
  timer = null;

  async componentDidMount() {
    if (localStorage.getItem("accessToken")) {
      const userInfo = await this.getUserInformation();
      if (!userInfo.error) {
        this.setState({
          userAccount: userInfo,
          isAuthUser: true,
        });
      }
    }
    document.getElementById("login").addEventListener("click", this.userAuthVerification);
  }

  appLogin = () => {
    document.getElementById("dz-root").click();
    this.handleClose();
  }

  handleDrawerClick = (pageNumber) => {
    this.setState({
      toolBarText: drawerValues[pageNumber],
      pageNumber,
    });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  userAuthVerification = async () => {
    const userInfo = await this.getUserInformation();
    if (!userInfo.error) {
      this.setState({
        userAccount: userInfo,
        isAuthUser: true
      });
    }
  }

  appLogout = () => {
    localStorage.removeItem('accessToken');
    this.setState({ isAuthUser: false });
  }

  getUserInformation = async () => {
    const res = await fetch('http://localhost:3000/getUser',
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem("accessToken") }),
      });
    return await res.json();
  }

  changePlayingState = (condition) => {
    this.setState({
      isPlaying: condition,
      playingId: localStorage.getItem("trackId"),
    });
  }

  searchInputHandler = async (value) => {
    const res = await fetch('http://localhost:3000/search',
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: value }),
      });
    const searchResults = await res.json();
    this.setState({ searchResults });
  }

  handleSearchInput = (event) => {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(this.searchInputHandler, 2000, event.target.value);
  }

  openContextComponent = (type, info) => {
    this.handleDrawerClick(type);
    this.handleClose();
    this.setState({
      albumOrArtistInfo: info,
    });
  }

  openPlaylistComponent = (type, playlist) => {
    this.handleDrawerClick(type);
    this.handleClose();
    this.setState({
      playlistInfo: playlist,
    });
  }

  onTrackClick = (trackId, type) => {
    localStorage.setItem("trackId", trackId);
    if (type === "deezer") {
      document.getElementById("load-new-track").click();
    }
    if (type === "soundcloud") {
      document.getElementById("sc-load-new-track").click();
    }
  }

  render() {
    const { classes } = this.props;
    const open = Boolean(this.state.anchorEl);

    const loginElement = (
      <div className={classes.loginElement}>
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          {this.state.isAuthUser
            ? <Avatar src={this.state.userAccount.picture} />
            : <AccountCircle />
          }
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          {!this.state.isAuthUser
            && <MenuItem onClick={this.appLogin}>Login</MenuItem>
          }
          <MenuItem onClick={() => this.handleDrawerClick(5)} disabled={!this.state.isAuthUser}>Playlists</MenuItem>
          {this.state.isAuthUser
            && <MenuItem onClick={this.appLogout}>Logout</MenuItem>
          }
        </Menu>
      </div>
    )

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
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={drawerValues[2]} />
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
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={this.handleSearchInput}
              />
            </div>
            {loginElement}
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
          {this.state.pageNumber === 0 &&
            <DeezerMusicComponent
              searchResults={this.state.searchResults}
              isPlaying={this.state.isPlaying}
              playingId={this.state.playingId}
              onTrackClick={this.onTrackClick}
              openContextComponent={this.openContextComponent}
            />
          }
          {this.state.pageNumber === 1 &&
            <SoundcloudMusicComponent
              searchResults={this.state.searchResults}
              isPlaying={this.state.isPlaying}
              playingId={this.state.playingId}
              onTrackClick={this.onTrackClick}
              openContextComponent={this.openContextComponent}
            />
          }
          {this.state.pageNumber === 2 && <AboutComponent />}
          {this.state.pageNumber === 3 && <ArtistComponent
            artist={this.state.albumOrArtistInfo}
            isPlaying={this.state.isPlaying}
            playingId={this.state.playingId}
            onTrackClick={this.onTrackClick}
          />}
          {this.state.pageNumber === 4 && <AlbumComponent
            album={this.state.albumOrArtistInfo}
            isPlaying={this.state.isPlaying}
            playingId={this.state.playingId}
            onTrackClick={this.onTrackClick}
          />}
          {this.state.pageNumber === 5 && <PlaylistsComponent
            openPlaylistComponent={this.openPlaylistComponent}
          />}
          {this.state.pageNumber === 6 && <PlaylistComponent
            playlist={this.state.playlistInfo}
            backToPlaylists={this.handleDrawerClick}
          />}
          <TrackPlayerComponent changePlayingState={this.changePlayingState} />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RootComponent);