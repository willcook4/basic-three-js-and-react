import React, { Component } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

const AnimationWrapper = styled.div`
  /* scene size is controlled by setting container dimensions */
  height: 250px;
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

  // adding any custom Three.js objects into a scene
  // based on source: https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneOnjects = () => {
    const geometry = new THREE.BoxGeometry( 2, 2, 2); // new box with, width, height depth args
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289, // Hexadecimal color value of the geometry (0x156289), blueish
      emissive: 0x072534, // (light) colour or the material
      side: THREE.DoubleSide, // which of the face sides will be rendered - front, back or both. Default is THREE.FrontSide. Other options are THREE.BackSide and THREE.DoubleSide.
      flatShading: true // rendered with flat shading
    })
    this.cube = new THREE.Mesh( geometry, material );
    this.scene.add( this.cube );

    const lights = []; // light storage
    // A light that gets emitted from a single point in all directions. A common use case for this is to replicate the light emitted from a bare lightbulb. 
    // Args:(color, distance, decay) 
    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    // set the position of each light, determines direction, 
    lights[ 0 ].position.set( 0, 200, 0 );
    lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( - 100, - 200, - 100 );
    // Add the lights to the scene
    this.scene.add( lights[ 0 ] );
    this.scene.add( lights[ 1 ] );
    this.scene.add( lights[ 2 ] );
  };

  /**
   * This will create a loop that causes the renderer to draw the scene 
   * every time the screen is refreshed (on a typical screen this means 60 times per second).
   * 
   * requestAnimationFrame has a number of advantages over setInterval.
   * Including pausing when the user navigates to another browser tab. 
   * 
   * refresh rate of the screen should not be confused with frames per second (FPS): 
   * having FPS equal screen refresh rate is desirable
   * */ 
  startAnimationLoop = () => {
    // Animate the rotation on the X axis
    this.cube.rotation.x += 0.01;
    // Animate the rotation on the Y axis
    this.cube.rotation.y += 0.01;

    this.renderer.render( this.scene, this.camera );

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  render() {
    return (
      <AnimationWrapper ref={this.mountPointRef} />
    );
  }
}

export default App;
