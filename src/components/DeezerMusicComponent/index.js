import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

class DeezerMusicComponent extends Component {
  render() {
    return (
      <div>Deezer</div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DeezerMusicComponent);