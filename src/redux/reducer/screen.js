export const NEW_PROFILES = 'profile/new-many';
export const UPDATE_PROFILE = 'profile/update';

const initialState = {
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case NEW_PROFILES:
            return {
            };
        case UPDATE_PROFILE:
            return {
            };
        default:
            return state
    }
}

// export const newProfiles = (profiles) => {
//     return {type: NEW_PROFILES, profiles}
// };

export default reducer;