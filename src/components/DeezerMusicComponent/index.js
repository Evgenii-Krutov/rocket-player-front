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
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlaylistModalComponent from '../PlaylistModalComponent/index';

class DeezerMusicComponent extends Component {
  state = {
    modalOpen: false,
    track: {},
  };

  async componentDidMount() {
  }

  handleClickOpen = (track) => {
    const formattedTrack = {
      name: `${track.artist.name} - ${track.title}`,
      avatar: track.album.cover_medium,
      playingId: track.id
    };
    this.setState({ track: formattedTrack, modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

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
        <PlaylistModalComponent
          modalOpen={this.state.modalOpen}
          track={this.state.track}
          handleClose={this.handleClose}
          type={"deezer"}
        />
        <GridList cellHeight={190} cols={6}>
          {this.props.searchResults.deezer.artists.map(artist => (
            <GridListTile className={classes.gridList} key={artist.id} cols={1}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => { this.props.openContextComponent(3, artist, "deezer") }}>
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
                <CardActionArea onClick={() => this.props.openContextComponent(4, album, "deezer")}>
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