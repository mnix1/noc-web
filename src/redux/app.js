import { combineReducers } from 'redux'
import socket from "./reducer/socket";
import page from "./reducer/page";
import screen from "./reducer/screen";
import battle from "./reducer/battle";

const app = combineReducers({
    socket,
    page,
    screen,
    battle
});

export default app;