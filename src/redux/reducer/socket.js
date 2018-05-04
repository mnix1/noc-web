export const SOCKET_CREATED = 'socket/created';

const initialState = {
    socket: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SOCKET_CREATED:
            return {
                ...state,
                socket: action.socket
            };
        default:
            return state
    }
}

export const socketCreated = (socket) => {
    return {type: SOCKET_CREATED, socket}
};
