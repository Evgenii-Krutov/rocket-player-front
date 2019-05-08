import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';


class PlaylistComponent extends Component {
  state = {
  };

  async componentDidMount() {
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
        <Button variant="contained" color="secondary" onClick={this.deletePlaylist}>
          Delete playlist
        </Button>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PlaylistComponent);