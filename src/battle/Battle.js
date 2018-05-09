import * as THREE from 'three';
import FirstPersonControls from "first-person-controls";
import Field from "./field/Field";
import MonkChampion from "./champion/MonkChampion";

export default class Battle {

    constructor(container, worldRadius) {
        console.log('battle', this);
        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.worldRadius = worldRadius;
        this.initField();
        // const axes = new THREE.AxesHelper(20);
        // this.scene.add(axes);
        this.initCamera();
        this.initLight();
        this.initChampions();
        // this.camera.position.set()
        this.initRenderer(container);
        this.animations = [];
    }

    initRenderer(container) {
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            transparent: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.getElementById(container).appendChild(this.renderer.domElement);
    }

    initTestControls() {
        this.controls = new FirstPersonControls(this.champions[0]);
        this.controls.movementSpeed = 10;
        this.controls.lookSpeed = 0.125;
        // this.controls.lookVertical = true;
        // this.controls.constrainVertical = true;
        // this.controls.verticalMin = 1.1;
        // this.controls.verticalMax = 2.2;
    }

    initLight() {
        const ambientLight = new THREE.AmbientLight(0x888888); // soft white light
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, -1, 1);
        this.scene.add(directionalLight);

        // this.spotLight = new THREE.SpotLight(0xffffff);
        // this.spotLight.position.set(0, 0, 20);
        // this.spotLight.lookAt(this.scene.position);
        // this.scene.add(this.spotLight);
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, 0, 50);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    initField() {
        this.field = new Field(this.scene, this.worldRadius);
    }

    initChampions() {
        this.champions = [];
        this.myChampion = new MonkChampion((champion) => {
            this.initChampion(champion);
            this.myChampion = champion;
            this.initChampionControl(this.myChampion);
        });
        this.otherChampions = [];

    }

    initChampion(champion) {
        champion.correctSize();
        this.scene.add(champion.mesh);
        champion.playAnimation('idle');
        this.champions.push(champion);
        this.placeChampion(champion);
    }

    placeChampion(champion) {
        if (this.champions.length === 1) {
            champion.mesh.position.set(0, -this.worldRadius * 18 / 20, 0);
            champion.mesh.rotation.y = Math.PI;
        }
    }

    initChampionControl(champion) {
        const startPosition = this.camera.position.clone();
        const championPosition = champion.mesh.position;
        const endPosition = new THREE.Vector3(championPosition.x, championPosition.y - 2, 4);
        const duration = 2;
        let timer = 0;
        const newPositionElement = (property) => startPosition[property] + (endPosition[property] - startPosition[property]) * timer / duration;
        this.animations.push((delta) => {
            timer += delta;
            const newActualPosition = timer >= duration ? endPosition : new THREE.Vector3(newPositionElement('x'), newPositionElement('y'), newPositionElement('z'));
            this.camera.position.set(newActualPosition.x, newActualPosition.y, newActualPosition.z);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            return {ended: timer >= duration};
        });
    }

    updateAnimations(delta) {
        const toRemove = [];
        this.animations.forEach((animation, index) => {
            const result = animation(delta);
            if (result.ended) {
                toRemove.push(index);
            }
        });
        toRemove.forEach(index => this.animations.splice(index, 1));
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        const delta = this.clock.getDelta();
        this.champions.forEach(e => e.updateMixer(delta));
        this.render(delta);
    };

    render(delta) {
        this.updateAnimations(delta);
        this.renderer.render(this.scene, this.camera);
    }
}