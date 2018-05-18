import * as THREE from 'three';
import {ControlListeners} from "./ControlListeners";
import {Action, DANCE, MOVE_BACKWARD, MOVE_FORWARD, MOVE_LEFT, MOVE_RIGHT, SPRINT} from "./Action";

export class Control {

    constructor(champion, domElement, startPosition) {
        this.champion = champion;
        this.body = champion.mesh;
        this.head = champion.bones.head;
        this.box = new THREE.Box3().setFromObject(this.body);
        this.target = new THREE.Vector3(0, 0, 0);
        this.headTarget = new THREE.Vector3(0, 0, 0);
        this.bodyTarget = new THREE.Vector3(0, 0, 0);
        this.domElement = domElement || document;
        this.walkSpeed = 1.0;
        this.sprintSpeed = 3.0;
        this.targetDistance = 100;
        this.lookSpeed = 0.1;
        this.lookVertical = true;
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
        if (this.action[MOVE_FORWARD] && !this.action[MOVE_BACKWARD]) this.body.translateZ((moveForwardSpeed));
        if (this.action[MOVE_BACKWARD] && !this.action[MOVE_FORWARD]) this.body.translateZ(-moveOtherSpeed);
        if (this.action[MOVE_LEFT] && !this.action[MOVE_RIGHT]) this.body.translateX(moveOtherSpeed);
        if (this.action[MOVE_RIGHT] && !this.action[MOVE_LEFT]) this.body.translateX(-moveOtherSpeed);
        const actualLookSpeed = delta * this.lookSpeed;
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
        const bodyPosition = this.body.position;
        this.target.x = bodyPosition.x + this.targetDistance * Math.sin(this.phi) * Math.cos(this.theta);
        this.target.y = bodyPosition.y + this.targetDistance * Math.cos(this.phi);
        this.target.z = bodyPosition.z + this.targetDistance * Math.sin(this.phi) * Math.sin(this.theta);
        this.updateBodyTarget();
        // const bodyTargetPosition = headTargetPosition.clone();
        // bodyTargetPosition.y = 0;
        // this.body.lookAt(bodyTargetPosition);
        this.clearPointer();
    };

    updateBodyTarget() {
        const distance = Math.sqrt(Math.pow(this.target.x - this.bodyTarget.x, 2) + Math.pow(this.target.z - this.bodyTarget.z, 2));
        console.log('distance', distance);
        this.headTarget.y = this.target.y;
        if (this.action.isMoving() || distance > this.targetDistance / 2) {
            this.bodyTarget.x = this.target.x;
            this.bodyTarget.z = this.target.z;
            this.body.lookAt(this.bodyTarget);
            this.headTarget.x = 0;
            this.headTarget.z = this.targetDistance;
        } else {
            this.headTarget.x += this.targetDistance * Math.sin(this.phi) * Math.cos(this.theta);
            this.headTarget.z += this.targetDistance * Math.sin(this.phi) * Math.sin(this.theta);
        }
        this.head.lookAt(this.headTarget);
    }

    clearPointer() {
        if (this.pointer.x !== 0 || this.pointer.y !== 0) {
            this.pointer.x = 0;
            this.pointer.y = 0;
            this.handleChanged();
        }
    }

    prepareCameraPosition() {
        const position = new THREE.Vector3(0, 0, 0);
        position.sub(this.headTarget);
        position.add(this.body.position);
        position.normalize();
        position.multiplyScalar(1.5);
        position.add(this.body.position);
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
        const cR = this.body.rotation;
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