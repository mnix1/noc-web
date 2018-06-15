import {ATTACK, DANCE, JUMP, MOVE_BACKWARD, MOVE_FORWARD, MOVE_LEFT, MOVE_RIGHT, PUNCH, SPRINT} from "./Action";

export class ControlListeners {

    constructor(domElement, action, pointer) {
        this.domElement = domElement;
        this.action = action;
        this.pointer = pointer;
        this.initListeners();
    }

    initListeners() {
        document.addEventListener('pointerlockchange', this.onPointerLockChanged, false);
        document.addEventListener('pointerlockerror', this.onPointerLockError, false);
        window.addEventListener('click', this.onMouseClick, false);
        this.domElement.addEventListener('contextmenu', this.onContextMenu, false);
        window.addEventListener('keydown', this.onKeyDown, false);
        window.addEventListener('keyup', this.onKeyUp, false);
    }

    onPointerLockChanged = () => {
        if (this.domElement === document.pointerLockElement) {
            this.domElement.addEventListener('mousemove', this.onMouseMove, false);
        } else {
            this.domElement.removeEventListener('mousemove', this.onMouseMove);
        }
    };

    onPointerLockError = (e) => {
        console.error('onPointerLockError', e);
    };

    onMouseClick = () => {
        if (this.initPointerLock()) {
            return;
        }
        this.action.change(PUNCH, true);
    };

    initPointerLock() {
        if (this.domElement !== document.pointerLockElement) {
            this.domElement.requestPointerLock();
            return true;
        }
        return false;
    }

    onContextMenu(event) {
        event.preventDefault();
    }

    dispose() {
        document.removeEventListener('pointerlockchange', this.onPointerLockChanged, false);
        document.removeEventListener('pointerlockerror', this.onPointerLockError, false);
        window.removeEventListener('click', this.onMouseClick, false);
        this.domElement.removeEventListener('contextmenu', this.onContextMenu, false);
        this.domElement.removeEventListener('mousemove', this.onMouseMove, false);
        window.removeEventListener('keydown', this.onKeyDown, false);
        window.removeEventListener('keyup', this.onKeyUp, false);
    };

    onMouseMove = (event) => {
        this.pointer.x = event.movementX;
        this.pointer.y = event.movementY;
    };

    onKeyDown = (event) => {
        console.log('keyCode', event.keyCode);
        switch (event.keyCode) {
            case 38: /*up*/
            case 87: /*W*/
                this.action.change(MOVE_FORWARD, true);
                break;
            case 37: /*left*/
            case 65: /*A*/
                this.action.change(MOVE_LEFT, true);
                break;
            case 40: /*down*/
            case 83: /*S*/
                this.action.change(MOVE_BACKWARD, true);
                break;
            case 39: /*right*/
            case 68: /*D*/
                this.action.change(MOVE_RIGHT, true);
                break;
            case 16: /*SHIFT*/
                this.action.change(SPRINT, true);
                break;
            case 66: /*B*/
                this.action.change(DANCE, true);
                break;
            case 32: /*SPACE*/
                this.action.change(JUMP, true);
                break;
            default:
                return;
        }
    };

    onKeyUp = (event) => {
        switch (event.keyCode) {
            case 38: /*up*/
            case 87: /*W*/
                this.action.change(MOVE_FORWARD, false);
                break;
            case 37: /*left*/
            case 65: /*A*/
                this.action.change(MOVE_LEFT, false);
                break;
            case 40: /*down*/
            case 83: /*S*/
                this.action.change(MOVE_BACKWARD, false);
                break;
            case 39: /*right*/
            case 68: /*D*/
                this.action.change(MOVE_RIGHT, false);
                break;
            case 16: /*SHIFT*/
                this.action.change(SPRINT, false);
                break;
            case 66: /*B*/
                this.action.change(DANCE, false);
                break;
            case 32: /*B*/
                this.action.change(JUMP, false);
                break;
            default:
                return;
        }
    };

}