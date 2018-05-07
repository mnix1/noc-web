import * as THREE from 'three';
import FirstPersonControls from "first-person-controls";
import Field from "./Field";
import MonkChampion from "./champion/MonkChampion";

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

    createChampion() {
        this.champions = [new MonkChampion((champion) => {
            champion.place();
            this.scene.add(champion.mesh);
        })];
        // this.loadFbx(monk, );
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        const delta = this.clock.getDelta();
        // if (this.mixers.length > 0) {
        //     for (let i = 0; i < this.mixers.length; i++) {
        //         this.mixers[i].update(delta);
        //     }
        // }
        this.render(delta);
    };

    render(delta) {
        if (this.controls) {
            this.controls.update(delta);
        }
        this.renderer.render(this.scene, this.camera);
    }
}