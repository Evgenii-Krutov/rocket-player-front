import React, { Component } from 'react';
import './App.css';
import RootComponent from './components/RootComponent/RootComponent';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <RootComponent />
      </React.Fragment>
    );
  }
}

export default App;
