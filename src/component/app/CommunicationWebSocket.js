import {BATTLE_STATUS_IN_PROGRESS, BATTLE_STATUS_PREPARING, battleStatusChanged} from "../../redux/reducer/battle";

export default class CommunicationWebSocket {
    constructor() {
        const socket = new WebSocket("ws://localhost:8080/websocket");
        // const socket = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/websocket");
        socket.addEventListener('message', (e) => {
            // console.log('onmessage', e, e.data);
            if (e.data === 'BATTLE_PREPARING') {
                this.dispatch(battleStatusChanged(BATTLE_STATUS_PREPARING));
            } else if (e.data === 'BATTLE_IN_PROGRESS') {
                this.dispatch(battleStatusChanged(BATTLE_STATUS_IN_PROGRESS));
            }
        });
        socket.addEventListener('close', (e) => {
            console.log('onclose', e);
        });

        socket.addEventListener('error', (e) => {
            console.log('onerror', e);
        });
        socket.addEventListener('open', (e) => {
            console.log('onopen', e)
        });
        this.socket = socket;
    }

    send(message) {
        this.socket.send(message);
    }

    setDispatch(dispatch) {
        this.dispatch = dispatch;
    }
}
