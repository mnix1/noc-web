import * as THREE from 'three';

export default class Field {

    constructor(scene) {
        const geometry = new THREE.CircleGeometry(40, 40);
        const material = new THREE.MeshPhongMaterial({color: 0x002200});
        const mesh = new THREE.Mesh(geometry, material);

        // mesh.position.x = -this.width / 2;
        // this.camera.lookAt(mesh.position);
        scene.add(mesh);
        this.createTree(scene, -10, 4, 1);
        this.createTree(scene, 5, 2, 2);
        this.createTree(scene, 0, -35, 2);
        this.createTree(scene, 0, 35, 2);
    }

    createTree(scene, x, y, heightScale) {
        var trunk = new THREE.CubeGeometry(0.4, 0.4, 5 * heightScale);
        var leaves = new THREE.SphereGeometry(2 * heightScale);

        // create the mesh
        var trunkMesh = new THREE.Mesh(trunk, new THREE.MeshLambertMaterial({
            color: 0x8b4513
        }));
        var leavesMesh = new THREE.Mesh(leaves, new THREE.MeshLambertMaterial({
            color: 0x00ff00
        }));

        // position the trunk. Set y to half of height of trunk
        trunkMesh.position.set(x, y, 2.5 * heightScale);
        leavesMesh.position.set(x, y, 5 * heightScale);

        trunkMesh.castShadow = true;
        trunkMesh.receiveShadow = true;
        leavesMesh.castShadow = true;
        leavesMesh.receiveShadow = true;

        scene.add(trunkMesh);
        scene.add(leavesMesh);
    }

}