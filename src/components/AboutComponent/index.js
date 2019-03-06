import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import Typography from '@material-ui/core/Typography';

class AboutComponent extends Component {
  render() {
    return (
      <div>
        <Typography paragraph variant="subtitle1" color="inherit">
          This app is developed for diploma in university. With this app you can listen music from
          different music services, such as Deezer and Soundcloud. Also you can listen to custom radio from
          any music service available. You create your own radio. Can create playlists from different services.
          Enjoy!
        </Typography>
        <Typography paragraph variant="subtitle1" color="inherit">
          <ul>
            <li>
              <b>Deezer Music</b> - Can perform search, get results from music service Deezer,
              listen to music and create playlists from it
            </li>
            <li>
              <b>Soundcloud Music</b> - Can perform search, get results from music service Soundcloud,
              listen to music and create playlists from it. Difference from Deezer is that in Soundcloud 
              all users can upload their own music, so you can see user-owner of the track when performing search
            </li>
            <li>
              <b>Custom Radio</b> - App will have its own database with tracks links and genres. Links will be 
              from different music services, not Deezer and Soundcloud of course :). There you can filter tracks by genre
              and listen to big playlist of different tracks.
            </li>
            <li>Other options will be added later</li>
          </ul>
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AboutComponent);