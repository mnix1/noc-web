export const TURN_LEFT = 'tf';
export const TURN_RIGHT = 'tr';
export const PUNCH = 'p';
export const JUMP = 'j';

const actions = [
    TURN_LEFT,
    TURN_RIGHT,
    PUNCH,
    JUMP
];

export default class DiscreetAction {
    constructor() {
        this.state = {};
        actions.forEach(e => this.state[e] = false);
        this.changeListeners = [];
    }

    start(type) {
        if (!this.isBlocked()) {
            this.state[type] = true;
            this.handleChanged();
        }
    }

    end(type) {
        this.state[type] = false;
    }

    handleChanged() {
        this.changeListeners.forEach((e) => e(this));
    }

    addChangeListener(e) {
        this.changeListeners.push(e);
    }

    isBlocked() {
        return this.getActiveActions().length > 0;
    }

    getActiveActions = () => {
        return actions.filter(e => this.state[e]);
    }
}