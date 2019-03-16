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

class DeezerMusicComponent extends Component {
  async componentDidMount() {
  }

  onCardClick = (type, id) => {
    console.log('DED');
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.deezerMain}>
        {this.props.searchResults.artists.length === 0 &&
          this.props.searchResults.artists.length === 0 &&
          this.props.searchResults.artists.length === 0 &&
          <Typography variant="subheading" color="textSecondary" className={classes.deezerEmptyResults}>
            No results for any of categories
          </Typography>
        }
        {this.props.searchResults.artists.length !== 0 &&
          <Typography variant="subheading" color="textSecondary" className={classes.deezerCategory}>
            Artists
          </Typography>
        }
        <GridList cellHeight={190} cols={6}>
          {this.props.searchResults.artists.map(artist => (
            <GridListTile className={classes.gridList} key={artist.id} cols={1}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => { this.onCardClick('artist', artist.id) }}>
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
        {this.props.searchResults.albums.length !== 0 &&
          <Typography variant="subheading" color="textSecondary" className={classes.deezerCategory}>
            Albums
          </Typography>
        }
        <GridList cellHeight={190} cols={6}>
          {this.props.searchResults.albums.map(album => (
            <GridListTile className={classes.gridList} key={album.id} cols={1}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => this.onCardClick('album', album.id)}>
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
        {this.props.searchResults.tracks.length !== 0 &&
          <Typography variant="subheading" color="textSecondary" className={classes.deezerCategory}>
            Tracks
          </Typography>
        }
        <List dense={true}>
          {this.props.searchResults.tracks.map(track => (
            <ListItem>
              <ListItemAvatar>
                <img src={track.album.cover_medium} alt="" />
              </ListItemAvatar>
              <ListItemText
                primary={`${track.artist.name} - ${track.title}`}
              />
              <ListItemSecondaryAction>
                <IconButton>
                  <PlayCircleFilledIcon />
                </IconButton>
                <IconButton>
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