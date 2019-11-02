import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import TrackballControls from 'three-trackballcontrols';

const N = 30;
const MAX_LON = 39.550781;
const MIN_LON = -10.722656;
const LON_DIFF = Math.abs(MAX_LON - MIN_LON);
const MAX_LAT = 64.320872;
const MIN_LAT = 34.885931;
const LAT_DIFF = Math.abs(MAX_LAT - MIN_LAT);

console.log(`LON_DIFF: ${LON_DIFF}`, LON_DIFF);
console.log('LAT_DIFF:', LAT_DIFF);

const gData = [...Array(N).keys()].map(() => ({
    lat: MIN_LAT + Math.random() * LAT_DIFF,
    lng: MIN_LON + Math.random() * LON_DIFF,
    size: Math.random(),
    color: ['#931111', '#808080', '#e3e3e3'][Math.round(Math.random() * 2)]
}));

const Globe = new ThreeGlobe()
    .globeImageUrl('./images/earth-dark.jpg')
    .bumpImageUrl('./images/earth-topology.png')
    .pointsData(gData)
    .pointAltitude('size')
    .pointColor('color');

setInterval(
    () => {
        gData.forEach(d => (d.size = Math.random()) / 3);
        Globe.pointsData(gData);
    },
    4000,
    0
);

// Setup renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webgl').appendChild(renderer.domElement);

// Setup scene
const scene = new THREE.Scene();
scene.add(Globe);
scene.add(new THREE.AmbientLight(0xbbbbbb));
scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

// Setup camera
const camera = new THREE.PerspectiveCamera();
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
camera.position.z = 500;

// Add camera controls
const tbControls = new TrackballControls(camera, renderer.domElement);
tbControls.minDistance = 101;
tbControls.rotateSpeed = 5;
tbControls.zoomSpeed = 0.8;

// Kick-off renderer
(function animate() {
    // IIFE
    // Frame cycle
    tbControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
})();
