import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

class AlbumComponent extends Component {
  render() {
    return (
      <div>
          {this.props.album.title}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AlbumComponent);