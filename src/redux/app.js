import { combineReducers } from 'redux'
import page from "./reducer/page";
import screen from "./reducer/screen";

const app = combineReducers({
    page,
    screen
});

export default app;