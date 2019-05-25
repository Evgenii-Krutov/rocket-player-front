import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';


class PlaylistComponent extends Component {
  state = {
    tracks: [],
  };

  async componentDidMount() {
    await this.getPlaylistTracks();
  }

  getPlaylistTracks = async () => {
    const response = await fetch('http://localhost:3000/getPlaylistTracks',
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: this.props.playlist.id }),
      });
    const tracks = await response.json();
    this.setState({ tracks });
  }

  deletePlaylist = async () => {
    await fetch('http://localhost:3000/deletePlaylist',
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: this.props.playlist.id }),
      });
    this.props.backToPlaylists(5);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.playlistMain}>
        <Paper>
          <div className={classes.playlistHeader}>
            <Typography variant="h5" component="h3">
              {this.props.playlist.name}
            </Typography>
            <Button variant="contained" color="secondary" onClick={this.deletePlaylist}>
              Delete playlist
            </Button>
          </div>
        </Paper>
        <br />
        <Paper className={classes.trackList}>
          <List dense={true}>
            {this.state.tracks.map(track => (
              <ListItem>
                <ListItemAvatar>
                  <img src={track.avatar} alt="" />
                </ListItemAvatar>
                <ListItemText
                  primary={track.name}
                />
                <ListItemSecondaryAction>
                  <div className={classes.trackActions}>
                    {track.playing_id.toString() === this.props.playingId && this.props.isPlaying &&
                      <IconButton color="inherit">
                        <PauseCircleFilledIcon />
                      </IconButton>
                    }
                    {(track.playing_id.toString() !== this.props.playingId || !this.props.isPlaying) &&
                      <IconButton color="inherit" onClick={() => { this.props.onTrackClick(track.playing_id, this.props.playlist.type) }}>
                        <PlayCircleFilledIcon />
                      </IconButton>
                    }
                  </div>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PlaylistComponent);