import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DeezerMusicComponent extends Component {
  state = {
    modalOpen: false,
    track: {},
  };

  async componentDidMount() {
  }

  handleClickOpen = (track) => {
    this.setState({ track, modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  addTrackToPlaylist = async (playlistId) => {
    await fetch('http://localhost:3000/addTrackToPlaylist',
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: `${this.state.track.artist.name} - ${this.state.track.title}`,
        playlistId,
        avatar: this.state.track.album.cover_medium,
       }),
    });
    this.handleClose();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.deezerMain}>
        {this.props.searchResults.deezer.artists.length === 0 &&
          this.props.searchResults.deezer.albums.length === 0 &&
          this.props.searchResults.deezer.tracks.length === 0 &&
          <Typography variant="subheading" color="textSecondary" className={classes.deezerEmptyResults}>
            No results for any of categories
          </Typography>
        }
        {this.props.searchResults.deezer.artists.length !== 0 &&
          <Typography variant="subheading" color="textSecondary" className={classes.deezerCategory}>
            Artists
          </Typography>
        }
        <Dialog
          open={this.state.modalOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"User Playlists"}
          </DialogTitle>
          <DialogContent className={classes.playlistsModalMain}>
            <List>
              {this.props.playlists.deezer.map(playlist => (
                <ListItem button key={playlist.id} onClick={() => this.addTrackToPlaylist(playlist.id)}>
                  <ListItemText primary={playlist.name} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <GridList cellHeight={190} cols={6}>
          {this.props.searchResults.deezer.artists.map(artist => (
            <GridListTile className={classes.gridList} key={artist.id} cols={1}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => { this.props.openContextComponent(3, artist) }}>
                  <CardMedia
                    className={classes.media}
                    image={artist.picture_medium}
                  />
                  <CardContent>
                    <Typography component="p">
                      {artist.name.length > 20 ? `${artist.name.slice(0, 20)}...` : artist.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </GridListTile>
          ))}
        </GridList>
        {this.props.searchResults.deezer.albums.length !== 0 &&
          <Typography variant="subheading" color="textSecondary" className={classes.deezerCategory}>
            Albums
          </Typography>
        }
        <GridList cellHeight={190} cols={6}>
          {this.props.searchResults.deezer.albums.map(album => (
            <GridListTile className={classes.gridList} key={album.id} cols={1}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => this.props.openContextComponent(4, album)}>
                  <CardMedia
                    className={classes.media}
                    image={album.cover_medium}
                  />
                  <CardContent>
                    <Typography component="p">
                      {album.title.length > 20 ? `${album.title.slice(0, 20)}...` : album.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </GridListTile>
          ))}
        </GridList>
        {this.props.searchResults.deezer.tracks.length !== 0 &&
          <Typography variant="subheading" color="textSecondary" className={classes.deezerCategory}>
            Tracks
          </Typography>
        }
        <List dense={true}>
          {this.props.searchResults.deezer.tracks.map(track => (
            <ListItem>
              <ListItemAvatar>
                <img src={track.album.cover_medium} alt="" />
              </ListItemAvatar>
              <ListItemText
                primary={`${track.artist.name} - ${track.title}`}
              />
              <ListItemSecondaryAction>
                {track.id.toString() === this.props.playingId && this.props.isPlaying &&
                  <IconButton color="inherit">
                    <PauseCircleFilledIcon />
                  </IconButton>
                }
                {(track.id.toString() !== this.props.playingId || !this.props.isPlaying) &&
                  <IconButton color="inherit" onClick={() => this.props.onTrackClick(track.id, "deezer")}>
                    <PlayCircleFilledIcon />
                  </IconButton>
                }
                <IconButton color="inherit" onClick={() => this.handleClickOpen(track)}>
                  <PlaylistAddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DeezerMusicComponent);