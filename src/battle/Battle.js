import * as THREE from 'three';
import Field from "./field/Field";
import TommyBrookChampion from "./champion/TommyBrookChampion";
import {Control} from "./control/Control";
import {Stats} from "three-stats";
import AlbertHoopChampion from "./champion/AlbertHoopChampion";

// const stats = new Stats();
// stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom);

export default class Battle {

    constructor(container, worldRadius) {
        console.log('battle', this);
        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.worldRadius = worldRadius;
        this.animations = [];
        this.initRenderer(container);
        this.initField();
        // const axes = new THREE.AxesHelper(20);
        // this.scene.add(axes);
        this.initCamera();
        this.initLight();
        this.initChampions();
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

    initLight() {
        const ambientLight = new THREE.AmbientLight(0xaaaaaa);
        this.scene.add(ambientLight);
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, 50, 0);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    initField() {
        this.field = new Field(this.scene, this.worldRadius);
        this.animations.push((delta) => {
            this.field.updateSunPosition(delta);
            return {ended: false};
        });
    }

    initChampions() {
        this.champions = [];
        this.myChampion = new TommyBrookChampion((champion) => {
            this.initChampion(champion);
            this.myChampion = champion;
            this.initChampionControl(this.myChampion);
        });
        this.otherChampions = [new AlbertHoopChampion((champion) => {
            this.initChampion(champion);
            // this.initChampionControl(this.myChampion);
        })];
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
            champion.mesh.position.set(0, 0, -this.worldRadius * 18 / 20);
            // champion.mesh.rotation.y = Math.PI;
        } else {
            champion.mesh.position.set(0, 0, this.worldRadius * 18 / 20);
            // champion.mesh.rotation.y = 0;
        }
    }

    initChampionControl(champion) {
        const startPosition = this.camera.position.clone();
        const championPosition = champion.mesh.position;
        const endPosition = new THREE.Vector3(championPosition.x, 4, championPosition.z - 4);
        const duration = 2;
        let timer = 0;
        const newPositionElement = (property) => startPosition[property] + (endPosition[property] - startPosition[property]) * timer / duration;
        this.animations.push((delta) => {
            timer += delta;
            const newActualPosition = timer >= duration ? endPosition : new THREE.Vector3(newPositionElement('x'), newPositionElement('y'), newPositionElement('z'));
            this.camera.position.set(newActualPosition.x, newActualPosition.y, newActualPosition.z);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            if (timer >= duration) {
                this.championControlReady = true;
            }
            return {ended: timer >= duration};
        });
        // this.controls = new Control([this.myChampion.mesh, this.camera]);
        this.controls = new Control(this.myChampion.mesh, this.renderer.domElement);
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

    updateControls(delta) {
        if (this.controls) {
            if (this.controls.isMoving()) {
                if (this.controls.moveForward) {
                    if (this.controls.fastMovement) {
                        this.myChampion.stopAllAndPlayAnimation('run');
                    } else {
                        this.myChampion.stopAllAndPlayAnimation('walk');
                    }
                } else if (this.controls.moveBackward) {
                    this.myChampion.stopAllAndPlayAnimation('walkBack');
                } else if (this.controls.moveRight) {
                    this.myChampion.stopAllAndPlayAnimation('walkRight');
                } else if (this.controls.moveLeft) {
                    this.myChampion.stopAllAndPlayAnimation('walkLeft');
                } else {

                }
            } else {
                this.myChampion.stopAllAndPlayAnimation('idle');
            }
            this.controls.update(delta);
            if (this.championControlReady) {
                const newCameraPosition = this.controls.prepareCameraPosition();
                this.camera.position.set(newCameraPosition.x, newCameraPosition.y, newCameraPosition.z);
                this.camera.lookAt(this.controls.target);
            }
        }
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        const delta = this.clock.getDelta();
        this.champions.forEach(e => e.updateMixer(delta));
        this.render(delta);
    };

    render(delta) {
        // stats.update();
        this.updateAnimations(delta);
        this.updateControls(delta);
        this.renderer.render(this.scene, this.camera);
    }
}