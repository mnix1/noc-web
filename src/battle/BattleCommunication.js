// const socke t = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/gameWebSocket/binary");
import _ from 'lodash';

const BATTLE_SERVER_READY = 'BATTLE_SERVER_READY';
const BATTLE_STARTED = 'BATTLE_STARTED';
const BATTLE_STATE = 'BATTLE_STATE';

export default class BattleCommunication {
    constructor(communicationWebSocket, battle) {
        this.communicationWebSocket = communicationWebSocket;
        this.battle = battle;
        this.communicationWebSocket.socket.addEventListener('message', this.onMessage);
    }

    send(message) {
        this.communicationWebSocket.send(message);
    };

    onMessage = (e) => {
        const data = e.data;
        if (_.includes(data, BATTLE_STATE)) {
            this.handleBattleState(JSON.parse(data.substring(BATTLE_STATE.length)));
        } else if (_.includes(data, BATTLE_SERVER_READY)) {
            this.handleBattleServerReady(JSON.parse(data.substring(BATTLE_SERVER_READY.length)));
        } else if (data === BATTLE_STARTED) {
            this.handleBattleStarted();
        }
    };

    ready() {
        this.send('READY_FOR_START');
    }

    handleBattleServerReady(battleState) {
        this.battle.init(battleState);
    }

    handleBattleStarted() {

    }

    handleBattleState(battleState) {
        this.battle.update(battleState);
        // const otherProps = battleState.other[0];
        // this.battle.otherChampion.stopAllAndPlayAnimation(otherProps.a);
        // console.log('handleBattleState', battleState);
    }

}
