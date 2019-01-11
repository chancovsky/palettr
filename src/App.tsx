import React, { Component } from 'react';
import './App.css';
import SliderContainer from './containers/SliderContainer/SliderContainer';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="drag-bar"></div>
        <div className="container">
          <SliderContainer />
        </div>
      </div>
    );
  }
}

export default App;
