import * as THREE from 'three';

export class Control {

    constructor(object, domElement, startPosition) {
        this.moveChangedListeners = [];
        this.object = object;
        this.target = new THREE.Vector3(0, 0, 0);

        this.domElement = domElement || document;

        this.enabled = true;

        this.box = new THREE.Box3().setFromObject(object);

        this.walkSpeed = 2.0;
        this.sprintSpeed = 8.0;
        this.lookSpeed = 0.1;

        this.lookVertical = false;
        this.sprint = false;

        this.activeLook = true;

        this.heightSpeed = false;
        this.heightCoef = 1.0;
        this.heightMin = 0.0;
        this.heightMax = 1.0;

        this.constrainVertical = true;
        this.verticalMin = 0;
        this.verticalMax = Math.PI;

        this.autoSpeedFactor = 0.0;

        this.mouseX = 0;
        this.mouseY = 0;

        this.lat = 0;
        this.lon = startPosition === undefined ? 0 : startPosition;
        this.phi = 0;
        this.theta = 0;

        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;

        this.viewHalfX = 0;
        this.viewHalfY = 0;
        document.addEventListener('pointerlockchange', this.onPointerLockChanged, false);
        document.addEventListener('pointerlockerror', this.onPointerLockError, false);
        window.addEventListener('click', this.onMouseClickWithoutLock, false);
        this.domElement.addEventListener('contextmenu', this.contextMenu, false);
        window.addEventListener('keydown', this.onKeyDown, false);
        window.addEventListener('keyup', this.onKeyUp, false);
        this.handleResize();
    }

    initPointerLock() {
        if (this.domElement !== document.pointerLockElement) {
            this.domElement.requestPointerLock();
        }
    }

    onMouseClickWithoutLock = () => {
        this.initPointerLock();
    };

    onPointerLockChanged = () => {
        if (this.domElement === document.pointerLockElement) {
            this.domElement.addEventListener('mousemove', this.onMouseMove, false);
        } else {
            this.domElement.removeEventListener('mousemove', this.onMouseMove);
        }
    };

    onPointerLockError = (e) => {
        console.log('onPointerLockError', e);
    };

    handleResize() {
        this.viewHalfX = window.innerWidth / 2;
        this.viewHalfY = window.innerHeight / 2;
    };

    update(delta) {
        if (this.enabled === false) return;
        if (this.heightSpeed) {
            const y = THREE.Math.clamp(this.object.position.y, this.heightMin, this.heightMax);
            const heightDelta = y - this.heightMin;
            this.autoSpeedFactor = delta * (heightDelta * this.heightCoef);
        } else {
            this.autoSpeedFactor = 0.0;
        }
        const actualMoveSpeed = delta * (this.sprint ? this.sprintSpeed : this.walkSpeed);
        // if (this.moveForward) this.object.translateZ((actualMoveSpeed + this.autoSpeedFactor));
        // if (this.moveBackward) this.object.translateZ(-actualMoveSpeed);
        // if (this.moveLeft) this.object.translateX(actualMoveSpeed);
        // if (this.moveRight) this.object.translateX(-actualMoveSpeed);
        let actualLookSpeed = delta * this.lookSpeed;
        if (!this.activeLook) {
            actualLookSpeed = 0;
        }
        let verticalLookRatio = 1;
        if (this.constrainVertical) {
            verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);
        }
        this.lon += this.mouseX * actualLookSpeed;
        if (this.lookVertical) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;
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
        if (this.mouseX !== 0) {
            this.mouseX = 0;
            this.handleMoveChanged();
        }
    };

    onMouseMove = (event) => {
        this.mouseX = event.movementX * 100;
        this.mouseY = event.pageY - this.viewHalfY;
    };

    onKeyDown = (event) => {
        switch (event.keyCode) {
            case 38: /*up*/
            case 87: /*W*/
                this.moveChange('moveForward', true);
                break;
            case 37: /*left*/
            case 65: /*A*/
                this.moveChange('moveLeft', true);
                break;
            case 40: /*down*/
            case 83: /*S*/
                this.moveChange('moveBackward', true);
                break;
            case 39: /*right*/
            case 68: /*D*/
                this.moveChange('moveRight', true);
                break;
            case 16: /*SHIFT*/
                this.moveChange('sprint', true);
                break;
            default:
                return;
        }
    };

    onKeyUp = (event) => {
        switch (event.keyCode) {
            case 38: /*up*/
            case 87: /*W*/
                this.moveChange('moveForward', false);
                break;
            case 37: /*left*/
            case 65: /*A*/
                this.moveChange('moveLeft', false);
                break;
            case 40: /*down*/
            case 83: /*S*/
                this.moveChange('moveBackward', false);
                break;
            case 39: /*right*/
            case 68: /*D*/
                this.moveChange('moveRight', false);
                break;
            case 16: /*SHIFT*/
                this.moveChange('sprint', false);
                break;
            default:
                return;
        }
    };

    addMoveChangedListener(e) {
        this.moveChangedListeners.push(e);
    }

    moveChange(prop, newState) {
        if (this[prop] !== newState) {
            this[prop] = newState;
            this.handleMoveChanged();
        }
    }

    handleMoveChanged() {
        this.moveChangedListeners.forEach((e) => e(this));
    }

    contextMenu(event) {
        event.preventDefault();
    }

    dispose() {
        document.removeEventListener('pointerlockchange', this.onPointerLockChanged, false);
        document.removeEventListener('pointerlockerror', this.onPointerLockError, false);
        window.removeEventListener('click', this.onMouseClickWithoutLock, false);
        this.domElement.removeEventListener('contextmenu', this.contextMenu, false);
        this.domElement.removeEventListener('mousemove', this.onMouseMove, false);
        window.removeEventListener('keydown', this.onKeyDown, false);
        window.removeEventListener('keyup', this.onKeyUp, false);
    };

    prepareCameraPosition() {
        const position = new THREE.Vector3(0, 0, 0);
        position.sub(this.target);
        position.add(this.object.position);
        position.normalize();
        position.multiplyScalar(1.5);
        position.add(this.object.position);
        position.add(new THREE.Vector3(0, this.box.max.y*1.05, 0));
        return position;
    }

    isMoving() {
        return this.moveForward || this.moveLeft || this.moveRight || this.moveBackward;
    }

    serialize = () => {
        const rotation = this.object.rotation;
        // const o = {rx: rotation.x, ry: rotation.y, rz: rotation.z};
        const o = {
            rx: Math.round(rotation.x * 1000),
            ry: Math.round(rotation.y * 1000),
            rz: Math.round(rotation.z * 1000)
        };
        if (this.moveForward) {
            o.moveForward = true;
        }
        if (this.moveLeft) {
            o.moveLeft = true;
        }
        if (this.moveRight) {
            o.moveRight = true;
        }
        if (this.moveBackward) {
            o.moveBackward = true;
        }
        if (this.sprint) {
            o.sprint = true;
        }
        return "MOVE" + JSON.stringify(o);
    }
}