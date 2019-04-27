import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

class ArtistComponent extends Component {
  state = {
    genre: "",
    artistTracks: [],
  };

  async componentDidMount() {
    const tracksResponse = await fetch('http://localhost:3000/getArtistTracks',
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tracks: this.props.artist.tracklist }),
      });
    const tracks = await tracksResponse.json();
    this.setState({ artistTracks: tracks.data });
  }

  formatDuration = (seconds) => {
    const minutes = Math.trunc(seconds / 60);
    const durSeconds = seconds - minutes * 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = durSeconds < 10 ? `0${durSeconds}` : durSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridList className={classes.gridList} cellHeight={570} cols={3}>
          <div cols={1}>
            <Paper className={classes.infoColumn}>
              <img
                src={this.props.artist.picture_xl}
                height={300}
                width={300}
                alt=''
              />
              <Typography className={classes.infoHeader} variant="title">
                {this.props.artist.name}
              </Typography>
              <Typography className={classes.infoTracks} variant="subheading" color="textPrimary">
                Albums: {this.props.artist.nb_albums}
              </Typography>
              <Typography className={classes.infoTracks} variant="subheading" color="textPrimary">
                Fans: {this.props.artist.nb_fans}
              </Typography>
            </Paper>
          </div>
          <div cols={2}>
            <Paper className={classes.trackList}>
              <List dense={true}>
                {this.state.artistTracks.map(track => (
                  <ListItem>
                    <ListItemAvatar>
                      <img src={track.album.cover_medium} alt="" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={track.title}
                    />
                    <ListItemSecondaryAction>
                      <div className={classes.trackActions}>
                        <div className={classes.trackDuration}>
                          <Typography>
                            {this.formatDuration(track.duration)}
                          </Typography>
                        </div>
                        {track.id.toString() === this.props.playingId && this.props.isPlaying &&
                          <IconButton color="inherit">
                            <PauseCircleFilledIcon />
                          </IconButton>
                        }
                        {(track.id.toString() !== this.props.playingId || !this.props.isPlaying) &&
                          <IconButton color="inherit" onClick={() => { this.props.onTrackClick(track.id, "deezer") }}>
                            <PlayCircleFilledIcon />
                          </IconButton>
                        }
                        <IconButton color="inherit">
                          <PlaylistAddIcon />
                        </IconButton>
                      </div>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </div>
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ArtistComponent);