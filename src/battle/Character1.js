import * as THREE from 'three';
import FirstPersonControls from "first-person-controls";

export default class Champion {

    constructor(scene, options = {headRadius: 1, eyeRadius: 0.05, noseRadius: 0.1, bodyRadius: 2}) {
        const mesh = new THREE.Mesh();
        this.createBody(mesh, options);
        mesh.position.z = options.bodyRadius;
        scene.add(mesh);
        this.mesh = mesh;
    }

    createBody(scene, options) {
        const geometry = new THREE.SphereGeometry(options.bodyRadius, 30);
        const material = new THREE.MeshLambertMaterial({color: 0xfedcc8});
        const mesh = new THREE.Mesh(geometry, material);
        // mesh.position.x = -this.width / 2;
        // this.camera.lookAt(mesh.position);
        scene.add(mesh);
        this.createHead(mesh, options);
    }

    createHead(scene, options) {
        const geometry = new THREE.SphereGeometry(options.headRadius, 30);
        const material = new THREE.MeshLambertMaterial({color: 0xfedcc8});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = options.bodyRadius + options.headRadius / 2;
        // this.camera.lookAt(mesh.position);
        scene.add(mesh);
        this.createEyes(mesh, options);
        this.createNose(mesh, options);
        this.createMouth(mesh, options);
    }

    createEyes(scene, options) {
        this.createEye(scene, options, options.headRadius / 4);
        this.createEye(scene, options, -options.headRadius / 4);
    }

    createEye(scene, options, x) {
        const geometry = new THREE.SphereGeometry(options.eyeRadius, 30);
        const material = new THREE.MeshLambertMaterial({color: 0x009900});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -(options.headRadius - options.eyeRadius / 2);
        mesh.position.z = options.headRadius / 4;
        mesh.position.x = x;
        scene.add(mesh);
    }

    createNose(scene, options) {
        const geometry = new THREE.SphereGeometry(options.noseRadius, 30);
        const material = new THREE.MeshLambertMaterial({color: 0xfed3c8});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -(options.headRadius - options.noseRadius / 2);
        scene.add(mesh);
    }

    createMouth(scene, options) {
        const y = -(options.headRadius - options.noseRadius / 2);
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-options.headRadius / 3, y, -options.headRadius / 4),
            new THREE.Vector3(0, y, -options.headRadius / 2.6),
            new THREE.Vector3(options.headRadius / 3, y, -options.headRadius / 4)
        ]);
        const geometry = new THREE.TubeGeometry(curve, 8, options.noseRadius, 2, true);
        const material = new THREE.MeshLambertMaterial({color: 0xee0000});
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    }


}