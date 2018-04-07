import {LEFT_MENU_ITEMS} from "../../component/layout/leftMenu/leftMenuConfig";

export const PAGE_CHANGED = 'page/changed';

const initialState = {
    page: LEFT_MENU_ITEMS[0].id
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case PAGE_CHANGED:
            return {
                ...state,
                page: action.page
            };
        default:
            return state
    }
}

export const pageChanged = (page) => {
    return {type: PAGE_CHANGED, page}
};

export default reducer;