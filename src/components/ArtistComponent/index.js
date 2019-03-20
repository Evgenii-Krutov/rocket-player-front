import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

class ArtistComponent extends Component {
  componentDidMount() {
    console.log(this.props.artist)
  }
  render() {
    return (
      <div>
        AAAA:
        {this.props.artist.name}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ArtistComponent);