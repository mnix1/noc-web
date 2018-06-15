import * as THREE from 'three';
import {ControlListeners} from "./ControlListeners";
import {
    DANCE,
    MOVE_BACKWARD,
    MOVE_FORWARD,
    MOVE_LEFT,
    MOVE_RIGHT,
    SPRINT
} from "./ContinuousAction";
import {HEAD_BONE} from "../ChampionHelper";
import ContinuousAction from "./ContinuousAction";
import DiscreetAction from "./DiscreetAction";

const LOOK_SPEED = 0.1;
const TARGET_DISTANCE = 100;

export class Control {

    constructor(champion, domElement, startPosition) {
        this.champion = champion;
        this.champion.animationManager.addAnimationFinishedListener(this.handleChampionAnimationFinished);
        this.body = champion.mesh;
        this.head = champion.bones[HEAD_BONE];
        this.box = new THREE.Box3().setFromObject(this.body);
        this.target = new THREE.Vector3(0, 0, 0);
        this.headTarget = new THREE.Vector3(0, 0, 0);
        this.bodyTarget = new THREE.Vector3(0, 0, 0);
        this.domElement = domElement || document;
        this.horizontalAngle = startPosition === undefined ? 0 : startPosition;
        this.bodyUpdatedHorizontalAngle = this.horizontalAngle;
        this.verticalAngle = 0;
        this.previousRotation = {x: 0, y: 0, z: 0};
        this.pointer = {x: 0, y: 0};
        this.discreetAction = new DiscreetAction();
        // this.discreetAction.addChangeListener(this.handleChanged);
        this.discreetAction.addChangeListener(this.handleActionChanged);
        this.continuousAction = new ContinuousAction();
        // this.continuousAction.addChangeListener(this.handleChanged);
        this.continuousAction.addChangeListener(this.handleActionChanged);
        this.controlListeners = new ControlListeners(domElement, this.continuousAction, this.discreetAction, this.pointer);
        this.changeListeners = [];
    }

    handleChampionAnimationFinished = (props, champion) => {
        if (props.action === champion.actions.turnLeft || props.action === champion.actions.turnRight) {
            // this.champion.animationManager.playNextAnimation(undefined, 'idle');
            // this.updateBodyTarget(false);
        }
    };

    handleActionChanged = () => {
        let newAnimation = 'idle';
        if (this.continuousAction.state[MOVE_FORWARD] && !this.continuousAction.state[MOVE_BACKWARD]) {
            if (this.continuousAction.state[SPRINT]) {
                newAnimation = 'run';
            } else {
                newAnimation = 'walk';
            }
        } else if (this.continuousAction.state[MOVE_BACKWARD] && !this.continuousAction.state[MOVE_FORWARD]) {
            newAnimation = 'walkBack';
        } else if (this.continuousAction.state[MOVE_RIGHT] && !this.continuousAction.state[MOVE_LEFT]) {
            newAnimation = 'walkRight';
        } else if (this.continuousAction.state[MOVE_LEFT] && !this.continuousAction.state[MOVE_RIGHT]) {
            newAnimation = 'walkLeft';
        } else if (this.continuousAction.state[DANCE]) {
            newAnimation = 'danceSamba';
        }
        this.champion.animationManager.playNextAnimation(undefined, newAnimation);
        // this.champion.stopAllAndPlayAnimation(newAnimation);
    };

    handleChanged = () => {
        this.changeListeners.forEach((e) => e(this));
    };

    addChangeListener(e) {
        this.changeListeners.push(e);
    }

    update(delta) {
        this.updateBodyPosition(delta);
        const actualLookSpeed = delta * LOOK_SPEED;
        this.horizontalAngle += this.pointer.x * actualLookSpeed;
        this.verticalAngle -= this.pointer.y * actualLookSpeed;
        this.verticalAngle = Math.max(-Math.PI / 2 + Math.PI / 90, Math.min(Math.PI / 2 - Math.PI / 90, this.verticalAngle));
        const bodyPosition = this.body.position;
        this.target.x = bodyPosition.x + TARGET_DISTANCE * Math.cos(this.horizontalAngle);
        this.target.y = bodyPosition.y + TARGET_DISTANCE * Math.sin(this.verticalAngle);
        this.target.z = bodyPosition.z + TARGET_DISTANCE * Math.sin(this.horizontalAngle);
        this.checkTurn(bodyPosition);
        this.clearPointer();
    };

    updateBodyPosition(delta) {
        const moveForwardSpeed = delta * (this.continuousAction.state[SPRINT] ? this.champion.stats.runSpeed : this.champion.stats.walkSpeed);
        const moveOtherSpeed = delta * this.champion.stats.walkSpeed;
        const movingForwardOrBackward = this.continuousAction.isMovingForwardOrBackward();
        const movingLeftOrRight = this.continuousAction.isMovingLeftOrRight();
        if (movingForwardOrBackward) {
            const forward = this.continuousAction.isMovingForward();
            const speed = forward ? moveForwardSpeed : moveOtherSpeed;
            let factor = forward ? 1 : -1;
            if (movingLeftOrRight) {
                factor /= Math.sqrt(2);
            }
            this.body.translateZ(factor * speed);
        }
        if (movingLeftOrRight) {
            let factor = this.continuousAction.isMovingLeft() ? 1 : -1;
            if (movingForwardOrBackward) {
                factor /= Math.sqrt(2);
            }
            this.body.translateX(factor * moveOtherSpeed);
        }
    }

    checkTurn(bodyPosition) {
        this.headTarget.y = this.target.y;
        if (this.continuousAction.isMoving()) {
            this.bodyUpdatedHorizontalAngle = this.horizontalAngle;
            return this.updateBodyTarget(true, bodyPosition);
        }
        const maxAngle = Math.PI / 3 + Math.PI / 6;
        if (Math.abs(this.bodyUpdatedHorizontalAngle - this.horizontalAngle) > maxAngle) {
            if (this.bodyUpdatedHorizontalAngle > this.horizontalAngle) {
                this.champion.animationManager.playNextAnimation(undefined, 'turnLeft');
            } else {
                this.champion.animationManager.playNextAnimation(undefined, 'turnRight');
            }
            this.bodyUpdatedHorizontalAngle = this.horizontalAngle;
        } else {
            this.headTarget.x = bodyPosition.x + TARGET_DISTANCE * Math.sin(this.bodyUpdatedHorizontalAngle - this.horizontalAngle);
            this.headTarget.z = bodyPosition.z + TARGET_DISTANCE * Math.cos(this.horizontalAngle - this.bodyUpdatedHorizontalAngle);
            this.head.lookAt(this.headTarget);
        }
    }

    updateBodyTarget(isMoving, bodyPosition = this.body.position) {
        this.bodyTarget.x = isMoving ? this.target.x : bodyPosition.x + TARGET_DISTANCE * Math.cos(this.bodyUpdatedHorizontalAngle);
        this.bodyTarget.z = isMoving ? this.target.z : bodyPosition.z + TARGET_DISTANCE * Math.sin(this.bodyUpdatedHorizontalAngle);
        this.body.lookAt(this.bodyTarget);
        if (this.headTarget.x !== 0 || this.headTarget.z !== TARGET_DISTANCE) {
            this.headTarget.x = 0;
            this.headTarget.z = TARGET_DISTANCE;
            this.head.lookAt(this.headTarget);
        }
    }

    clearPointer() {
        if (this.pointer.x !== 0 || this.pointer.y !== 0) {
            this.pointer.x = 0;
            this.pointer.y = 0;
            // this.handleChanged();
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
        const activeActions = this.continuousAction.getActiveActions();
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