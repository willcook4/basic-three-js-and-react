import React, { Component } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

const AnimationWrapper = styled.div`
  /* scene size is controlled by setting container dimensions */
  width: 250px;
`

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

  // Setup the scene, camera and renderer
  sceneSetup = () => {
    let width = this.mountPointRef.current.clientWidth // window.innerWidth;
    let height = this.mountPointRef.current.clientHeight // window.innerHeight; 

    // Setup Scene
    this.scene = new THREE.Scene();
    // Setup a camera
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near clipping plane (anything closer than this wont be rendered)
      1000 // far plane (anything further away than this wont be rendered)
    );
    // set a distance from the cube( cube is located at z = 0)
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer(); // instantiate the WebGL renderer
    this.renderer.setSize( width, height); // set the size of the renderer

    // mount using the react ref
    this.mountPointRef.current.appendChild( this.renderer.domElement );
  };

  addCustomSceneOnjects = () => {};

  startAnimationLoop = () => {};

  render() {
    return (
      <AnimationWrapper ref={this.mountPointRef} />
    );
  }
}

export default App;
