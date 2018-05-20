import Ground from "./Ground";
import * as THREE from "three";

export default class Field {
    constructor(scene, worldRadius) {
        this.worldRadius = worldRadius;
        this.scene = scene;
        new Ground(scene, worldRadius);
        this.initSun();
    }

    initSun() {
        this.pointLight1 = new THREE.PointLight(0xdddddd, 1);
        this.pointLight1.position.set(0, this.worldRadius / 2, 0);
        // this.pointLight2 = new THREE.PointLight(0xdddddd, 1);
        // this.pointLight2.position.set(0, 0, this.worldRadius);
        this.time = 0;
        this.scene.add(this.pointLight1);
        // this.scene.add(this.pointLight2);
    }

    updateSunPosition(delta) {
        this.time += delta;
        const fullRotationDuration = 20;
        const t = this.time / fullRotationDuration * Math.PI * 2;
        this.pointLight1.position.set(Math.sin(t) * this.worldRadius / 2, this.worldRadius / 2, Math.cos(t) * this.worldRadius / 2);
        // this.pointLight2.position.set(Math.cos(t / 2 + Math.PI * 3 / 4) * this.worldRadius, this.worldRadius, Math.cos(t / 2 + Math.PI * 3 / 4) * this.worldRadius);
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