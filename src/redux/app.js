import { combineReducers } from 'redux'
import page from "./reducer/page";

const app = combineReducers({
    page
});

export default app;