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
        this.horizontalAngle = startPosition === undefined ? 0 : startPosition;
        this.verticalAngle = 0;
        this.bodyUpdatedHorizontalAngle = this.horizontalAngle;
        this.previousRotation = {x: 0, y: 0, z: 0};
        this.pointer = {x: 0, y: 0};
        this.action = new Action();
        this.action.addChangeListener(this.handleChanged);
        this.action.addChangeListener(this.handleActionChanged);
        this.controlListeners = new ControlListeners(domElement, this.action, this.pointer);
        this.changeListeners = [];

        this.champion.addAnimationFinishedListener(this.handleChampionAnimationFinished);
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
        this.champion.playNextAnimation(undefined, newAnimation);
        // this.champion.stopAllAndPlayAnimation(newAnimation);
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
        this.horizontalAngle += this.pointer.x * actualLookSpeed;
        this.verticalAngle -= this.pointer.y * actualLookSpeed;
        this.verticalAngle = Math.max(-Math.PI / 2 + Math.PI / 90, Math.min(Math.PI / 2 - Math.PI / 90, this.verticalAngle));
        const bodyPosition = this.body.position;
        this.target.x = bodyPosition.x + this.targetDistance * Math.cos(this.horizontalAngle);
        this.target.y = bodyPosition.y + this.targetDistance * Math.sin(this.verticalAngle);
        this.target.z = bodyPosition.z + this.targetDistance * Math.sin(this.horizontalAngle);
        this.checkTurn(bodyPosition);
        this.clearPointer();
    };

    checkTurn(bodyPosition) {
        this.headTarget.y = this.target.y;
        if (this.action.isMoving()) {
            this.bodyUpdatedHorizontalAngle = this.horizontalAngle;
            return this.updateBodyTarget(true, bodyPosition);
        }
        const maxAngle = Math.PI / 3 + Math.PI / 6;
        if (Math.abs(this.bodyUpdatedHorizontalAngle - this.horizontalAngle) > maxAngle) {
            if (this.bodyUpdatedHorizontalAngle > this.horizontalAngle) {
                this.champion.playNextAnimation(undefined, 'turnLeft');
            } else {
                this.champion.playNextAnimation(undefined, 'turnRight');
            }
            this.bodyUpdatedHorizontalAngle = this.horizontalAngle;
        } else {
            this.headTarget.x = bodyPosition.x + this.targetDistance * Math.sin(this.bodyUpdatedHorizontalAngle - this.horizontalAngle);
            this.headTarget.z = bodyPosition.z + this.targetDistance * Math.cos(this.horizontalAngle - this.bodyUpdatedHorizontalAngle);
            this.head.lookAt(this.headTarget);
        }
    }

    updateBodyTarget(isMoving, bodyPosition = this.body.position) {
        this.bodyTarget.x = isMoving ? this.target.x : bodyPosition.x + this.targetDistance * Math.cos(this.bodyUpdatedHorizontalAngle);
        this.bodyTarget.z = isMoving ? this.target.z : bodyPosition.z + this.targetDistance * Math.sin(this.bodyUpdatedHorizontalAngle);
        this.body.lookAt(this.bodyTarget);
        if (this.headTarget.x !== 0 || this.headTarget.z !== this.targetDistance) {
            this.headTarget.x = 0;
            this.headTarget.z = this.targetDistance;
            this.head.lookAt(this.headTarget);
        }
    }

    handleChampionAnimationFinished = (props, champion) => {
        if (props.action === champion.actions.turnLeft || props.action === champion.actions.turnRight) {
            this.champion.playNextAnimation(undefined, 'idle');
            this.updateBodyTarget(false);
        }
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
        position.add(this.body.position);
        position.normalize();
        position.multiplyScalar(2);
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