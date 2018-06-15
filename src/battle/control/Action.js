export const IDLE = 'i';
export const MOVE_FORWARD = 'mf';
export const MOVE_BACKWARD = 'mb';
export const MOVE_LEFT = 'ml';
export const MOVE_RIGHT = 'mr';
export const SPRINT = 's';
export const DANCE = 'd';
export const ATTACK = 'a';
export const PUNCH = 'p';
export const JUMP = 'j';

const actions = [
    IDLE,
    MOVE_FORWARD, MOVE_BACKWARD, MOVE_LEFT, MOVE_RIGHT,
    SPRINT,
    DANCE,

    PUNCH,
    JUMP
];


export class Action {
    constructor() {
        actions.forEach(e => this[e] = false);
        this.changeListeners = [];
    }

    change(type, state) {
        if (this[type] !== state) {
            this[type] = state;
            this.handleChanged();
        }
    }

    handleChanged() {
        this.changeListeners.forEach((e) => e(this));
    }

    addChangeListener(e) {
        this.changeListeners.push(e);
    }

    isMoving() {
        return this[MOVE_FORWARD] || this[MOVE_BACKWARD] || this[MOVE_LEFT] || this[MOVE_RIGHT];
    }

    getActiveActions = () => {
        return actions.filter(e => this[e]);
    }
}