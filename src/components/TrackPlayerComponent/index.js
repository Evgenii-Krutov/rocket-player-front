import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

class TrackPlayerComponent extends Component {
  state = {
    percentage: 0,
    isStopped: false,
    trackInfo: {
      title: 'Nothing to play',
      duration: '00:00',
      image: 'https://cdn.spindizzyrecords.com/uploads/2017/07/default-release-cd.png',
      artist: 'Choose any track to start',
    },
  };

  componentDidMount() {
    document.getElementById("update-track-line").addEventListener("click", this.updateLine);
    document.getElementById("load-new-track").addEventListener("click", this.loadNewTrack);
    document.getElementById("sc-load-new-track").addEventListener("click", this.scLoadNewTrack);
  }

  loadNewTrack = () => {
    this.startMusic();
  }

  scLoadNewTrack = () => {
    this.scStartMusic();
  }

  updateLine = () => {
    const percent = localStorage.getItem("trackPosition");
    if(percent === "0" && this.state.isStopped) {
      this.props.changePlayingState(false);
    }
    this.setState({ percentage: 1295 * percent });
  }

  startMusic = async () => {
    if (!localStorage.getItem("trackId")) {
      return;
    }
    const track = await this.getTrackInfo("deezer");
    const trackInfo = {
      title: track.title,
      duration: this.formatDuration(track.duration),
      image: track.album.cover_medium,
      artist: track.artist.name,
    }
    this.setState({ trackInfo });
    document.getElementById("start-track").click();
    this.setState({ isStopped: false });
    this.props.changePlayingState(true);
  }

  formatDuration = (seconds) => {
    const minutes = Math.trunc(seconds/60);
    const durSeconds = seconds - minutes * 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = durSeconds < 10 ? `0${durSeconds}` : durSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  scStartMusic = async () => {
    if (!localStorage.getItem("trackId")) {
      return;
    }
    const track = await this.getTrackInfo("soundcloud");
    const trackInfo = {
      title: track.title,
      duration: this.formatDuration(Math.round(track.duration/1000)),
      image: track.artwork_url,
      artist: "",
    }
    this.setState({ trackInfo });
    document.getElementById("sc-start-track").click();
    this.setState({ isStopped: false });
    this.props.changePlayingState(true);
  }

  playMusic = async () => {
    this.setState({ isStopped: false });
    this.props.changePlayingState(true);
    const playId = this.props.serviceType === "deezer" ? "play" : "sc-play";
    document.getElementById(playId).click();
  }

  stopMusic = async () => {
    this.setState({ isStopped: true });
    this.props.changePlayingState(false);
    const stopId = this.props.serviceType === "deezer" ? "stop" : "sc-stop";
    document.getElementById(stopId).click();
  }

  getTrackInfo = async (type) => {
    const res = await fetch('http://localhost:3000/getTrack',
    { 
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trackId: localStorage.getItem("trackId"), type }),
    });
    return await res.json();
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <AppBar position="fixed" color="default" className={classes.footerAppBar}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.songLine} style={{width : this.state.percentage}}></div>
            <img src={this.state.trackInfo.image} alt="" width={56} height={56} className={classes.trackImage}/>
            <div>
              <Typography variant="h5" component="h3">
                {this.state.trackInfo.title}
              </Typography>
              <Typography component="p">
                {this.state.trackInfo.artist}
              </Typography>
            </div>
            <div className={classes.trackDuration}>
              <Typography variant="h5" component="h3">
                {this.state.trackInfo.duration}
              </Typography>
            </div>
            <div className={classes.trackButtons}>
              <IconButton color="inherit">
                <FastRewindIcon />
              </IconButton>
              {this.state.percentage === 0 && 
                <IconButton color="inherit" onClick={this.startMusic}>
                  <PlayCircleFilledIcon />
                </IconButton>
              }
              {this.state.percentage !== 0 && !this.state.isStopped &&
                <IconButton color="inherit" onClick={this.stopMusic}>
                  <PauseCircleFilledIcon />
                </IconButton>
              }
              {this.state.percentage !== 0 && this.state.isStopped &&
                <IconButton color="inherit" onClick={this.playMusic}>
                  <PlayCircleFilledIcon />
                </IconButton>
              }
              <IconButton color="inherit">
                <FastForwardIcon />
              </IconButton>
              <IconButton color="inherit">
                <PlaylistAddIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TrackPlayerComponent);
