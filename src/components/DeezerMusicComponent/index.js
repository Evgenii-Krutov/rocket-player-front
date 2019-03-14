import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles'; 

class DeezerMusicComponent extends Component {
  async componentDidMount() {
  }

  render() {
    return (
      <React.Fragment>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DeezerMusicComponent);