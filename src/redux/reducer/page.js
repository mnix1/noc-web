import {PAGES} from "../../layout/config";

export const PAGE_CHANGED = 'page/changed';

const initialState = {
    page: PAGES[0].id
};

export default function reducer(state = initialState, action) {
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
