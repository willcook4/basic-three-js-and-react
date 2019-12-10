import React, { Component } from 'react';
import * as THREE from 'three';

class App extends Component {
  constructor(props) {
    super(props);
    this.mountPointRef = React.createRef()
  }

  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneOnjects();
    this.startAnimationLoop();
  }

  sceneSetup = () => {};

  addCustomSceneOnjects = () => {};

  startAnimationLoop = () => {};

  render() {
    return (
      <div ref={this.mountPointRef} />
    );
  }
}

export default App;
