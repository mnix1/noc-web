import Ground from "./Ground";

export default class Field {
    constructor(scene, worldRadius) {
        new Ground(scene, worldRadius);
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