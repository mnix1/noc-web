export const RESIZE = 'screen/resize';

const initialState = {
    leftMenuWidth: 300,
    topMenuHeight: 40,
    height: window.innerHeight,
    width: window.innerWidth,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case RESIZE:
            return {
                ...state,
                height: action.height,
                width: action.width
            };
        default:
            return state
    }
}

export function screenResized(height, width) {
    return {type: RESIZE, height, width};
}

