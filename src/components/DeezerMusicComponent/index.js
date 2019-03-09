import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles'; 

class DeezerMusicComponent extends Component {
  async componentDidMount() {
  }

  startMusic() {
    document.getElementById("start-track").click();
  }

  playMusic() {
    document.getElementById("play").click();
  }

  stopMusic() {
    document.getElementById("stop").click();
  }

  render() {
    return (
      <React.Fragment>
        <Button color="primary" variant="contained" onClick={this.startMusic}>Start music</Button>
        <Button color="primary" variant="contained" onClick={this.playMusic}>Play music</Button>
        <Button color="primary" variant="contained" onClick={this.stopMusic}>Stop music</Button>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DeezerMusicComponent);