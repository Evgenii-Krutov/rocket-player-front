import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

class CustomRadioComponent extends Component {
  render() {
    return (
      <div>Custom Radio</div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CustomRadioComponent);