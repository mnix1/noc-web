import {BATTLE_STATUS_IN_PROGRESS, BATTLE_STATUS_PREPARING, battleStatusChanged} from "../../redux/reducer/battle";
import _ from 'lodash';

export default class CommunicationWebSocket {
    constructor() {
        let socket;
        if(_.includes(window.location.host, 'localhost')){
            socket = new WebSocket("ws://localhost:8080/websocket");
        } else if (_.includes(window.location.host, ':3000')){
            socket = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host.replace(':3000','') + ":8080/websocket");
        } else {
            socket = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/websocket");
        }
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
