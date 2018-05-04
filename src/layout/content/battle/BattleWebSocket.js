// const socket = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/gameWebSocket/binary");
export default class BattleWebSocket {
    constructor() {
        const socket = new WebSocket("ws://localhost:8081/websocket");

        socket.addEventListener('message', (e, a, b) => {
            console.log('onmessage', e, e.data);
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
    }
}
