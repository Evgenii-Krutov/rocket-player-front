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

const DEFAULT_IMAGE_URL = 'https://cdn.spindizzyrecords.com/uploads/2017/07/default-release-cd.png';

class SoundcloudMusicComponent extends Component {
  async componentDidMount() {
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.soundcloudMain}>
        {this.props.searchResults.soundcloud.users.length === 0 &&
          this.props.searchResults.soundcloud.playlists.length === 0 &&
          this.props.searchResults.soundcloud.tracks.length === 0 &&
          <Typography variant="subheading" color="textSecondary" className={classes.soundcloudEmptyResults}>
            No results for any of categories
          </Typography>
        }
        {this.props.searchResults.soundcloud.users.length !== 0 &&
          <Typography variant="subheading" color="textSecondary" className={classes.soundcloudCategory}>
            People
          </Typography>
        }
        <GridList cellHeight={190} cols={6}>
          {this.props.searchResults.soundcloud.users.map(user => (
            <GridListTile className={classes.gridList} key={user.id} cols={1}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => { this.props.openContextComponent(3, user) }}>
                  <CardMedia
                    className={classes.media}
                    image={user.avatar_url}
                  />
                  <CardContent>
                    <Typography component="p">
                      {user.full_name.length > 20 ? `${user.full_name.slice(0, 20)}...` : user.full_name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </GridListTile>
          ))}
        </GridList>
        {this.props.searchResults.soundcloud.playlists.length !== 0 &&
          <Typography variant="subheading" color="textSecondary" className={classes.soundcloudCategory}>
            Playlists
          </Typography>
        }
        <GridList cellHeight={190} cols={6}>
          {this.props.searchResults.soundcloud.playlists.map(playlist => (
            <GridListTile className={classes.gridList} key={playlist.id} cols={1}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => this.props.openContextComponent(4, playlist)}>
                  <CardMedia
                    className={classes.media}
                    image={playlist.artwork_url || DEFAULT_IMAGE_URL}
                  />
                  <CardContent>
                    <Typography component="p">
                      {playlist.title.length > 20 ? `${playlist.title.slice(0, 20)}...` : playlist.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </GridListTile>
          ))}
        </GridList>
        {this.props.searchResults.soundcloud.tracks.length !== 0 &&
          <Typography variant="subheading" color="textSecondary" className={classes.soundcloudCategory}>
            Tracks
          </Typography>
        }
        <List dense={true}>
          {this.props.searchResults.soundcloud.tracks.map(track => (
            <ListItem>
              <ListItemAvatar>
                <img src={track.artwork_url || DEFAULT_IMAGE_URL} alt="" />
              </ListItemAvatar>
              <ListItemText
                primary={track.title}
              />
              <ListItemSecondaryAction>
                {track.id.toString() === this.props.playingId && this.props.isPlaying &&
                  <IconButton color="inherit">
                    <PauseCircleFilledIcon />
                  </IconButton>
                }
                {(track.id.toString() !== this.props.playingId || !this.props.isPlaying) &&
                  <IconButton color="inherit" onClick={() => {this.props.onTrackClick(track.id)}}>
                    <PlayCircleFilledIcon />
                  </IconButton>
                }
                <IconButton color="inherit">
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

export default withStyles(styles, { withTheme: true })(SoundcloudMusicComponent);
