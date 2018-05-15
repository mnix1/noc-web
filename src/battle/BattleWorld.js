import * as THREE from 'three';
import Field from "./field/Field";
import {Control} from "./control/Control";
import {getChampionById} from "./champion/ChampionHelper";

export default class BattleWorld {

    constructor(container, worldRadius) {
        this.scene = new THREE.Scene();
        this.worldRadius = worldRadius;
        this.animations = [];
        this.champions = [];
        this.initRenderer(container);
        this.initField();
        this.initCamera();
        this.initLight();
        // this.initChampions();
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
        this.camera.position.set(0, this.worldRadius, 0);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    initField() {
        this.field = new Field(this.scene, this.worldRadius);
        this.animations.push((delta) => {
            this.field.updateSunPosition(delta);
            return {ended: false};
        });
    }

    initMyChampion(props) {
        const championClass = getChampionById(props.id);
        this.myChampion = new championClass();
        return this.myChampion.load().then((champion) => {
            this.initChampion(champion, props);
            this.initControl(champion, props);
        });
    }

    initOtherChampion(props) {
        const championClass = getChampionById(props.id);
        this.otherChampion = new championClass();
        return this.otherChampion.load().then((champion) => {
            this.initChampion(champion, props);
        });
    }

    initChampion(champion, props) {
        champion.correctSize();
        this.scene.add(champion.mesh);
        champion.playAnimation(props.a);
        this.champions.push(champion);
        this.placeChampion(champion, props);
    }

    placeChampion(champion, props) {
        champion.mesh.position.set(props.px, props.py, props.pz);
        champion.mesh.rotation.set(props.rx, props.ry, props.rz);
    }

    initControl(champion, props) {
        this.control = new Control(this.myChampion.mesh, this.renderer.domElement, THREE.Math.radToDeg(props.ry) + 90);
        this.control.update(0);
        const startPosition = this.camera.position.clone();
        const endPosition = this.control.prepareCameraPosition();
        const targetStartPosition = new THREE.Vector3(0, 0, 0);
        const targetEndPosition = this.control.target;
        const duration = 4;
        let timer = 0;
        const newPositionElement = (property) => startPosition[property] + (endPosition[property] - startPosition[property]) * timer / duration;
        const newTargetPositionElement = (property) => targetStartPosition[property] + (targetEndPosition[property] - targetStartPosition[property]) * timer / duration;
        this.animations.push((delta) => {
            timer += delta;
            const ended = timer >= duration;
            const newActualPosition = ended ? endPosition : new THREE.Vector3(newPositionElement('x'), newPositionElement('y'), newPositionElement('z'));
            const newTargetActualPosition = ended ? targetEndPosition : new THREE.Vector3(newTargetPositionElement('x'), newTargetPositionElement('y'), newTargetPositionElement('z'));
            this.camera.position.set(newActualPosition.x, newActualPosition.y, newActualPosition.z);
            this.camera.lookAt(newTargetActualPosition);
            if (ended) {
                this.controlReady = true;
                this.control.addMoveChangedListener(this.onMoveChanged);
            }
            return {ended};
        });
    }

    onMoveChanged = (control) => {
    };

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
        if (this.control && this.controlReady) {
            if (this.control.isMoving()) {
                if (this.control.moveForward) {
                    if (this.control.sprint) {
                        this.myChampion.stopAllAndPlayAnimation('run');
                    } else {
                        this.myChampion.stopAllAndPlayAnimation('walk');
                    }
                } else if (this.control.moveBackward) {
                    this.myChampion.stopAllAndPlayAnimation('walkBack');
                } else if (this.control.moveRight) {
                    this.myChampion.stopAllAndPlayAnimation('walkRight');
                } else if (this.control.moveLeft) {
                    this.myChampion.stopAllAndPlayAnimation('walkLeft');

                }
            } else if (this.control.dance) {
                this.myChampion.stopAllAndPlayAnimation('dance');
            } else {
                this.myChampion.stopAllAndPlayAnimation('idle');
            }
            this.control.update(delta);
            const newCameraPosition = this.control.prepareCameraPosition();
            this.camera.position.set(newCameraPosition.x, newCameraPosition.y, newCameraPosition.z);
            this.camera.lookAt(this.control.target);
        }
    }

    render(delta) {
        this.champions.forEach(e => e.updateMixer(delta));
        // stats.update();
        this.updateAnimations(delta);
        this.updateControls(delta);
        this.renderer.render(this.scene, this.camera);
    }
}