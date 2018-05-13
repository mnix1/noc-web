import * as THREE from 'three';
import Field from "./field/Field";
import TommyBrookChampion from "./champion/TommyBrookChampion";
import {Control} from "./control/Control";
import {Stats} from "three-stats";
import AlbertHoopChampion from "./champion/AlbertHoopChampion";
import BattleCommunication from "./BattleCommunication";

export default class BattleChampion {

    // constructor() {
    //     this.champions = [];
    // }
    //
    // initMyChampion(championClass, props) {
    //     this.myChampion = new championClass((champion) => {
    //         this.initChampion(champion, props);
    //         this.initControl(champion, props);
    //     })
    // }
    //
    // initOtherChampion(championClass, props) {
    //     this.otherChampion = new championClass((champion) => {
    //         this.initChampion(champion, props);
    //     })
    // }
    //
    // initChampion(champion, props) {
    //     champion.correctSize();
    //     this.scene.add(champion.mesh);
    //     champion.playAnimation('idle');
    //     this.champions.push(champion);
    //     this.placeChampion(champion, props);
    // }
    //
    // placeChampion(champion, props) {
    //     champion.mesh.position.set(props.px, props.py, props.pz);
    //     champion.mesh.rotation.set(props.rx, props.ry, props.rz);
    // }
    //
    // initControl(champion, props) {
    //     const startPosition = this.camera.position.clone();
    //     const championPosition = champion.mesh.position;
    //     const endPosition = new THREE.Vector3(championPosition.x, 4, championPosition.z - 4);
    //     const duration = 2;
    //     let timer = 0;
    //     const newPositionElement = (property) => startPosition[property] + (endPosition[property] - startPosition[property]) * timer / duration;
    //     this.animations.push((delta) => {
    //         timer += delta;
    //         const newActualPosition = timer >= duration ? endPosition : new THREE.Vector3(newPositionElement('x'), newPositionElement('y'), newPositionElement('z'));
    //         this.camera.position.set(newActualPosition.x, newActualPosition.y, newActualPosition.z);
    //         this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    //         if (timer >= duration) {
    //             this.championControlReady = true;
    //         }
    //         return {ended: timer >= duration};
    //     });
    //     this.control = new Control(this.myChampion.mesh, this.renderer.domElement, THREE.Math.radToDeg(props.ry) + 90);
    //     this.control.addMoveChangedListener();
    // }
    //
    // updateAnimations(delta) {
    //     const toRemove = [];
    //     this.animations.forEach((animation, index) => {
    //         const result = animation(delta);
    //         if (result.ended) {
    //             toRemove.push(index);
    //         }
    //     });
    //     toRemove.forEach(index => this.animations.splice(index, 1));
    // }
    //
    // updateControls(delta) {
    //     if (this.control) {
    //         if (this.control.isMoving()) {
    //             if (this.control.moveForward) {
    //                 if (this.control.fastMovement) {
    //                     this.myChampion.stopAllAndPlayAnimation('run');
    //                 } else {
    //                     this.myChampion.stopAllAndPlayAnimation('walk');
    //                 }
    //             } else if (this.control.moveBackward) {
    //                 this.myChampion.stopAllAndPlayAnimation('walkBack');
    //             } else if (this.control.moveRight) {
    //                 this.myChampion.stopAllAndPlayAnimation('walkRight');
    //             } else if (this.control.moveLeft) {
    //                 this.myChampion.stopAllAndPlayAnimation('walkLeft');
    //             } else {
    //
    //             }
    //         } else {
    //             this.myChampion.stopAllAndPlayAnimation('idle');
    //         }
    //         this.control.update(delta);
    //         if (this.championControlReady) {
    //             const newCameraPosition = this.control.prepareCameraPosition();
    //             this.camera.position.set(newCameraPosition.x, newCameraPosition.y, newCameraPosition.z);
    //             this.camera.lookAt(this.control.target);
    //         }
    //     }
    // }
    //
    // animate = () => {
    //     requestAnimationFrame(this.animate);
    //     const delta = this.clock.getDelta();
    //     this.champions.forEach(e => e.updateMixer(delta));
    //     this.render(delta);
    // };
    //
    // render(delta) {
    //     // stats.update();
    //     this.updateAnimations(delta);
    //     this.updateControls(delta);
    //     this.renderer.render(this.scene, this.camera);
    // }
}