import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

class SoundcloudMusicComponent extends Component {
  render() {
    return (
      <div>Soundcloud</div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SoundcloudMusicComponent);
