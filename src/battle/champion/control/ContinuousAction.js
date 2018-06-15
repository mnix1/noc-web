export const IDLE = 'i';
export const MOVE_FORWARD = 'mf';
export const MOVE_BACKWARD = 'mb';
export const MOVE_LEFT = 'ml';
export const MOVE_RIGHT = 'mr';
export const SPRINT = 's';
export const DANCE = 'd';

const actions = [
    IDLE,
    MOVE_FORWARD, MOVE_BACKWARD, MOVE_LEFT, MOVE_RIGHT,
    SPRINT,
    DANCE,
];


export default class ContinuousAction {
    constructor() {
        this.state = {};
        actions.forEach(e => this.state[e] = false);
        this.changeListeners = [];
    }

    change(type, state) {
        if (this.state[type] !== state) {
            this.state[type] = state;
            this.handleChanged();
        }
    }

    handleChanged() {
        this.changeListeners.forEach((e) => e(this));
    }

    addChangeListener(e) {
        this.changeListeners.push(e);
    }

    isMovingLeft() {
        return this.state[MOVE_LEFT] && !this.state[MOVE_RIGHT];
    }

    isMovingRight() {
        return this.state[MOVE_RIGHT] && !this.state[MOVE_LEFT];
    }

    isMovingForward() {
        return this.state[MOVE_FORWARD] && !this.state[MOVE_BACKWARD];
    }

    isMovingBackward() {
        return this.state[MOVE_BACKWARD] && !this.state[MOVE_FORWARD];
    }

    isMovingLeftOrRight() {
        return this.isMovingLeft() || this.isMovingRight();
    }

    isMovingForwardOrBackward() {
        return this.isMovingForward() || this.isMovingBackward();
    }

    isMoving() {
        return this.isMovingForwardOrBackward() || this.isMovingLeftOrRight();
    }

    getActiveActions = () => {
        return actions.filter(e => this.state[e]);
    }
}