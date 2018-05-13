// const socket = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/gameWebSocket/binary");
import _ from 'lodash';
import {getChampionById} from "./champion/ChampionHelper";

const BATTLE_STARTED = 'BATTLE_STARTED';
const BATTLE_STATE = 'BATTLE_STATE';

export default class BattleWebSocket {
    constructor(communicationWebSocket, battle) {
        this.communicationWebSocket = communicationWebSocket;
        this.battle = battle;
        this.communicationWebSocket.socket.addEventListener('message', this.onMessage);
    }

    onMessage = (e) => {
        const data = e.data;
        if (_.includes(data, BATTLE_STARTED)) {
            this.handleBattleStarted(JSON.parse(data.substring(BATTLE_STARTED.length)));
        } else if (_.includes(data, BATTLE_STATE)) {
            this.handleBattleState(JSON.parse(data.substring(BATTLE_STATE.length)));
        }
    };

    handleBattleStarted(battleState){
        const myProps = battleState.my[0];
        this.battle.initMyChampion(getChampionById(myProps.id), myProps);
        const otherProps = battleState.other[0];
        this.battle.initOtherChampion(getChampionById(otherProps.id), otherProps);
    }

    handleBattleState(battleState) {
        console.log(battleState);
    }

}
