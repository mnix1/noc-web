import * as THREE from 'three';

import FirstPersonControls from "first-person-controls";
import Field from "./Field";
import Champion from "./Character1";
import Character2 from "./Character2";
import monkIdle from '../content/fbx/monk/monkIdle.fbx';
import monk from '../content/fbx/monk/monkT.fbx';
import FBXLoader from "../loader/FBXLoader";

export default class Battle {

    constructor(container, worldWidth, worldHeight, scale) {
        console.log('battle', this);
        this.clock = new THREE.Clock();
        this.width = worldHeight * scale;
        this.height = worldWidth * scale;
        this.scene = new THREE.Scene();

        const axes = new THREE.AxesHelper(20);
        this.scene.add(axes);

        this.initLight();
        this.initCamera();
        this.mixers = [];
        this.createField();
        this.createChampion();

        // this.initControls();
        // this.camera.position.set()

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById(container).appendChild(this.renderer.domElement);
    }

    initControls() {

        this.controls = new FirstPersonControls(this.camera);
        this.controls.movementSpeed = 10;
        this.controls.lookSpeed = 0.125;
        // this.controls.lookVertical = true;
        // this.controls.constrainVertical = true;
        // this.controls.verticalMin = 1.1;
        // this.controls.verticalMax = 2.2;
    }

    initLight() {
        const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, -10, 10);
        this.scene.add(directionalLight);

        // this.spotLight = new THREE.SpotLight(0xffffff);
        // this.spotLight.position.set(0, 0, 20);
        // this.spotLight.lookAt(this.scene.position);
        // this.scene.add(this.spotLight);
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, -6, 1);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    createField() {
        new Field(this.scene);
    }

    loadFbx(source) {
        const loader = new FBXLoader();
        loader.load(source, (object) => {
            console.log('object', object);
            // object.mixer = new THREE.AnimationMixer(object);
            // this.mixers.push(object.mixer);
            // const action = object.mixer.clipAction(object.animations[0]);
            // action.play();
            // // object.traverse(function (child) {
            // //     if (child.isMesh) {
            // //         child.castShadow = true;
            // //         child.receiveShadow = true;
            // //     }
            // // });
            object.rotation.x = Math.PI / 2;
            object.scale.set(0.01, 0.01, 0.01);
            this.scene.add(object);
        });
    }

    createChampion() {
        this.loadFbx(monk);
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        const delta = this.clock.getDelta();
        if (this.mixers.length > 0) {
            for (let i = 0; i < this.mixers.length; i++) {
                this.mixers[i].update(delta);
            }

        }
        this.render(delta);
        // this.champion.mesh.rotation.x = (this.champion.mesh.rotation.x + 0.02 );
        // this.champion.mesh.rotation.y -= 0.05;
    };

    render(delta) {
        if (this.controls) {
            this.controls.update(delta);
        }
        this.renderer.render(this.scene, this.camera);
    }
}