import * as THREE from 'three';

console.log('hello world', THREE);

const init = () => {
    const scene = new THREE.Scene();
    const box = getBox(1, 1, 1);

    // box.position.y = box.geometry.parameters.height / 2;
    box.position.z = -0.5;

    const plane = getPlane(4);
    plane.name = 'plane-1';
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    plane.add(box);

    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.z = 5;
    camera.position.x = 1;
    camera.position.y = 2;

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl').appendChild(renderer.domElement);

    update(renderer, scene, camera);

    return scene;
};

const getBox = (w, h, d) => {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
};

const getPlane = size => {
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
};

const update = (renderer, scene, camera) => {
    renderer.render(scene, camera);

    const plane = scene.getObjectByName('plane-1');

    plane.rotation.y += 0.001;
    //plane.rotation.z += 0.001;

    requestAnimationFrame(() => {
        update(renderer, scene, camera);
    });
};
const scene = init();
window.scene = scene;
console.log('scene:', scene);
