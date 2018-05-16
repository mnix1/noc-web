import * as THREE from 'three';
import {ControlListeners} from "./ControlListeners";
import {Action, DANCE, MOVE_BACKWARD, MOVE_FORWARD, MOVE_LEFT, MOVE_RIGHT, SPRINT} from "./Action";

export class Control {

    constructor(champion, domElement, startPosition) {
        this.champion = champion;
        this.object = champion.mesh;
        this.target = new THREE.Vector3(0, 0, 0);
        this.domElement = domElement || document;
        this.box = new THREE.Box3().setFromObject(this.object);
        this.walkSpeed = 1.0;
        this.sprintSpeed = 3.0;
        this.lookSpeed = 0.1;
        this.lookVertical = false;
        this.activeLook = true;
        this.constrainVertical = true;
        this.verticalMin = 0;
        this.verticalMax = Math.PI;
        this.lat = 0;
        this.lon = startPosition === undefined ? 0 : startPosition;
        this.phi = 0;
        this.theta = 0;
        this.previousRotation = {x: 0, y: 0, z: 0};
        this.pointer = {x: 0, y: 0};
        this.action = new Action();
        this.action.addChangeListener(this.handleChanged);
        this.action.addChangeListener(this.handleActionChanged);
        this.controlListeners = new ControlListeners(domElement, this.action, this.pointer);
        this.changeListeners = [];
    }

    handleActionChanged = () => {
        let newAnimation = 'idle';
        if (this.action[MOVE_FORWARD] && !this.action[MOVE_BACKWARD]) {
            if (this.action[SPRINT]) {
                newAnimation = 'run';
            } else {
                newAnimation = 'walk';
            }
        } else if (this.action[MOVE_BACKWARD] && !this.action[MOVE_FORWARD]) {
            newAnimation = 'walkBack';
        } else if (this.action[MOVE_RIGHT] && !this.action[MOVE_LEFT]) {
            newAnimation = 'walkRight';
        } else if (this.action[MOVE_LEFT] && !this.action[MOVE_RIGHT]) {
            newAnimation = 'walkLeft';
        } else if (this.action[DANCE]) {
            newAnimation = 'dance';
        }
        this.champion.stopAllAndPlayAnimation(newAnimation);

    };

    handleChanged = () => {
        this.changeListeners.forEach((e) => e(this));
    };

    addChangeListener(e) {
        this.changeListeners.push(e);
    }

    update(delta) {
        const moveForwardSpeed = delta * (this.action[SPRINT] ? this.sprintSpeed : this.walkSpeed);
        const moveOtherSpeed = delta * this.walkSpeed;
        if (this.action[MOVE_FORWARD] && !this.action[MOVE_BACKWARD]) this.object.translateZ((moveForwardSpeed));
        if (this.action[MOVE_BACKWARD] && !this.action[MOVE_FORWARD]) this.object.translateZ(-moveOtherSpeed);
        if (this.action[MOVE_LEFT] && !this.action[MOVE_RIGHT]) this.object.translateX(moveOtherSpeed);
        if (this.action[MOVE_RIGHT] && !this.action[MOVE_LEFT]) this.object.translateX(-moveOtherSpeed);
        let actualLookSpeed = delta * this.lookSpeed;
        if (!this.activeLook) {
            actualLookSpeed = 0;
        }
        let verticalLookRatio = 1;
        if (this.constrainVertical) {
            verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);
        }
        this.lon += this.pointer.x * actualLookSpeed;
        if (this.lookVertical) this.lat -= this.pointer.y * actualLookSpeed * verticalLookRatio;
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = THREE.Math.degToRad(90 - this.lat);
        this.theta = THREE.Math.degToRad(this.lon);
        if (this.constrainVertical) {
            this.phi = THREE.Math.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax);
        }
        const targetPosition = this.target,
            position = this.object.position;
        targetPosition.x = position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
        targetPosition.y = position.y + 100 * Math.cos(this.phi);
        targetPosition.z = position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
        this.object.lookAt(targetPosition);
        this.clearPointer();
    };

    clearPointer() {
        if (this.pointer.x !== 0 || this.pointer.y !== 0) {
            this.pointer.x = 0;
            this.pointer.y = 0;
            this.handleChanged();
        }
    }

    prepareCameraPosition() {
        const position = new THREE.Vector3(0, 0, 0);
        position.sub(this.target);
        position.add(this.object.position);
        position.normalize();
        position.multiplyScalar(1.5);
        position.add(this.object.position);
        position.add(new THREE.Vector3(0, this.box.max.y * 1.05, 0));
        return position;
    }

    serialize = () => {
        const o = {};
        this.addChangedRotation(o);
        const activeActions = this.action.getActiveActions();
        if (activeActions.length > 0) {
            o.a = activeActions;
        }
        return "CONTROL" + JSON.stringify(o);
    };

    addChangedRotation(o) {
        const cR = this.object.rotation;
        const pR = this.previousRotation;
        if (cR.x !== pR.x || cR.y !== pR.y || cR.z !== pR.z) {
            const rValue = (e) => Math.round(e * 1000);
            o.rx = rValue(cR.x);
            o.ry = rValue(cR.y);
            o.rz = rValue(cR.z);
            this.previousRotation = cR.clone();
        }
    }
}