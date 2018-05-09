import * as THREE from 'three';
import Ground from "./Ground";

export default class Field {
    constructor(scene) {
        new Ground(scene);
        this.createGround(scene);
    }

    createGround(scene) {
        const planeMat = new THREE.MeshPhongMaterial({
            color: 0x455029,
            specular: 0x000000,
            shininess: 0,
            side: THREE.DoubleSide,
        });
        const radius = 22;
        const segments = 32;
        const circleGeometry = new THREE.RingGeometry(0, radius, segments, segments, 0, Math.PI * 2);

        // Ground
        const ground = new THREE.Mesh(circleGeometry, planeMat);
        scene.add(ground);
        const boundMat = new THREE.MeshPhongMaterial({
            color: 0x111111,
            specular: 0x000000,
            shininess: 0,
            side: THREE.DoubleSide,
            shading: THREE.FlatShading
        });

        const boundGeometry = new THREE.TorusGeometry(21.5, 1, 6, 180);
        const bound = new THREE.Mesh(boundGeometry, boundMat);
        scene.add(bound);
    }

    // createTree(scene, x, y, heightScale) {
    //     const trunk = new THREE.CubeGeometry(0.4, 0.4, 5 * heightScale);
    //     const leaves = new THREE.SphereGeometry(2 * heightScale);
    //
    //     // create the mesh
    //     const trunkMesh = new THREE.Mesh(trunk, new THREE.MeshLambertMaterial({
    //         color: 0x8b4513
    //     }));
    //     const leavesMesh = new THREE.Mesh(leaves, new THREE.MeshLambertMaterial({
    //         color: 0x00ff00
    //     }));
    //
    //     // position the trunk. Set y to half of height of trunk
    //     trunkMesh.position.set(x, y, 2.5 * heightScale);
    //     leavesMesh.position.set(x, y, 5 * heightScale);
    //
    //     trunkMesh.castShadow = true;
    //     trunkMesh.receiveShadow = true;
    //     leavesMesh.castShadow = true;
    //     leavesMesh.receiveShadow = true;
    //
    //     scene.add(trunkMesh);
    //     scene.add(leavesMesh);
    // }

}