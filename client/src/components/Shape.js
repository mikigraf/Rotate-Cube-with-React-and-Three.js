import React, { Component } from "react";
import * as THREE from "three";
// const OrbitControls = require("three-orbit-controls")(THREE);
class Shape extends Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.addCube = this.addCube.bind(this);
    this.initializeCamera = this.initializeCamera.bind(this);
    // this.initializeOrbits = this.initializeOrbits.bind(this);
  }
componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    // this.scene = new THREE.Scene();
    this.scene = document.querySelector('a-scene').object3D;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true });
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    // this.initializeOrbits();
    this.initializeCamera();
    
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0xFF00FF } );
    this.cube = new THREE.Mesh( geometry, material );
    this.scene.add( this.cube );
    this.animate();
  }
componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    this.mount.removeChild(this.renderer.domElement);
  }
// initializeOrbits() {
//     this.controls.rotateSpeed = 1.0;
//     this.controls.zoomSpeed = 4.2;
//     this.controls.panSpeed = 4.8;
//   }
initializeCamera() {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 4;
  }
animate() {
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);

    this.cube.rotation.x += 0.01;     
    this.cube.rotation.y += 0.01;
  }
addCube(cube) {
    this.scene.add(cube);
  }

  onDocMouseDown(event, mesh) {
    const windowArea = event.target.getBoundingClientRect();
    const mouse3D = new THREE.Vector3(
      (event.clientX / this.mount.width) * 2 - 1,
      -(event.clientY / this.mount.height) * 2 + 1,
      0.5
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse3D, this.camera);
    let intersects = raycaster.intersectObjects(mesh);
    if (intersects.length > 0) {
      const hexCode =
      intersects[0].object.material.color.setHex(Math.random() *  0xffffff )
    }
  }
render() {
    return (
        <div>
        <div
          onClick={e => this.onDocMouseDown(e, [this.cube])}
          id="boardCanvas"
          style={{ width: "80vw", height: "40vw" }}
          ref={mount => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}
export default Shape;