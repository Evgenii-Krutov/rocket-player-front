import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

const DEFAULT_IMAGE_URL = 'https://cdn.spindizzyrecords.com/uploads/2017/07/default-release-cd.png';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PlaylistsComponent extends Component {
  state = {
    playlists: {
      deezer: [],
      soundcloud: []
    },
    modalOpen: false,
    playlistName: "",
    playlistType: "deezer",
  };

  async componentDidMount() {
    await this.getPlaylists();
  }

  handleClickOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleNameInput = event => {
    this.setState({ playlistName: event.target.value });
  }

  handlePlaylistTypeChange = event => {
    this.setState({ playlistType: event.target.value });
  };

  getPlaylists = async () => {
    const playlists = await fetch('http://localhost:3000/getPlaylists',
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
    const playlistsData = await playlists.json();
    this.setState({ playlists: playlistsData });
  }

  createPlaylist = async () => {
    this.handleClose();
    await fetch('http://localhost:3000/createPlaylist',
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.playlistName,
          type: this.state.playlistType,
        }),
      });
    await this.getPlaylists();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.playlistMain}>
        <Button variant="contained" onClick={this.handleClickOpen}>
          Create playlist
        </Button>
        <Dialog
          open={this.state.modalOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Enter name and type for playlist"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <TextField
                className={classes.formControl}
                autoFocus
                margin="dense"
                id="Name"
                label="Name"
                type="Name"
                fullWidth
                onChange={this.handleNameInput}
              />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="playlist-type">Playlist Type</InputLabel>
                <Select
                  value={this.state.playlistType}
                  onChange={this.handlePlaylistTypeChange}
                  inputProps={{
                    name: "type",
                    id: "playlist-type",
                  }}
                >
                  <MenuItem value={"deezer"}>Deezer</MenuItem>
                  <MenuItem value={"soundcloud"}>Soundcloud</MenuItem>
                </Select>
              </FormControl>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.createPlaylist} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
        {this.state.playlists.deezer.length === 0 &&
          this.state.playlists.soundcloud.length === 0 &&
          <Typography variant="subheading" color="textSecondary" className={classes.playlistEmptyResults}>
            You don't have any playlist yet.
          </Typography>
        }
        {this.state.playlists.deezer.length !== 0 &&
          <Typography variant="subheading" color="textSecondary" className={classes.playlistCategory}>
            Deezer playlists
          </Typography>
        }
        <GridList cellHeight={190} cols={6}>
          {this.state.playlists.deezer.map(playlist => (
            <GridListTile className={classes.gridList} key={playlist.id} cols={1}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => { this.props.openContextComponent(6, playlist) }}>
                  <CardMedia
                    className={classes.media}
                    image={DEFAULT_IMAGE_URL}
                  />
                  <CardContent>
                    <Typography component="p">
                      {playlist.name.length > 20 ? `${playlist.name.slice(0, 20)}...` : playlist.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </GridListTile>
          ))}
        </GridList>
        {this.state.playlists.soundcloud.length !== 0 &&
          <Typography variant="subheading" color="textSecondary" className={classes.playlistCategory}>
            Soundcloud playlists
          </Typography>
        }
        <GridList cellHeight={190} cols={6}>
          {this.state.playlists.soundcloud.map(playlist => (
            <GridListTile className={classes.gridList} key={playlist.id} cols={1}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => { this.props.openContextComponent(6, playlist) }}>
                  <CardMedia
                    className={classes.media}
                    image={DEFAULT_IMAGE_URL}
                  />
                  <CardContent>
                    <Typography component="p">
                      {playlist.name.length > 20 ? `${playlist.name.slice(0, 20)}...` : playlist.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PlaylistsComponent);