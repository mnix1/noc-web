export const BATTLE_STATUS_SEARCHING_OPPONENT = 'searching-opponent';
export const BATTLE_STATUS_PREPARING = 'preparing';
export const BATTLE_STATUS_IN_PROGRESS= 'in-progress';

const BATTLE_STATUS_CHANGED = 'battle/status/changed';

const initialState = {
    battleStatus: BATTLE_STATUS_IN_PROGRESS,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case BATTLE_STATUS_CHANGED:
            return {
                ...state,
                battleStatus: action.battleStatus
            };
        default:
            return state
    }
}

export const battleStatusChanged = (battleStatus) => {
    return {type: BATTLE_STATUS_CHANGED, battleStatus}
};

