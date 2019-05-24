import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { styles } from './styles';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PlaylistModalComponent extends Component {
  state = {
    playlists: {
      deezer: [],
      soundcloud: [],
    },
  };

  async componentDidMount() {
    const res = await fetch('http://localhost:3000/getPlaylists',
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
    const resultData = await res.json();
    this.setState({ playlists: resultData})  
  }

  addTrackToPlaylist = async (playlistId) => {
    console.log("TRACK: ", this.props.track);
    await fetch('http://localhost:3000/addTrackToPlaylist',
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${this.props.track.artist.name} - ${this.props.track.title}`,
          playlistId,
          avatar: this.props.track.album.cover_medium,
          playingId: this.props.track.id
        }),
      });
    this.props.handleClose();
  }

  render() {
    const { classes } = this.props;
    console.log("MASLJLKFAS: ", this.props.modalOpen);
    return (
      <Dialog
        open={this.props.modalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"User Playlists"}
        </DialogTitle>
        <DialogContent className={classes.playlistsModalMain}>
          <List>
            {this.state.playlists.deezer.map(playlist => (
              <ListItem button key={playlist.id} onClick={() => this.addTrackToPlaylist(playlist.id)}>
                <ListItemText primary={playlist.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PlaylistModalComponent);