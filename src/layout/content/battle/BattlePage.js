import styles from './style.css';
import React from 'react';
import {
    BATTLE_STATUS_IN_PROGRESS, BATTLE_STATUS_PREPARING,
    BATTLE_STATUS_SEARCHING_OPPONENT
} from "../../../redux/reducer/battle";
import Battle from "../../../battle/Battle";

let battle;

const CONTAINER = 'battle-container';

export default class BattlePage extends React.Component {

    componentDidMount() {
        this.battleInit();
        this.autoStart();
    }

    componentDidUpdate() {
        this.battleInit();
    }

    autoStart() {
        const {battleStatus} = this.props;
        if (battleStatus === undefined) {
            setTimeout(() => {
                this.battleStart();
            }, Math.random() * 1000 + 1000);
        }
    }

    battleInit() {
        const {socket, battleStatus} = this.props;
        if (battleStatus === BATTLE_STATUS_PREPARING && battle === undefined) {
            battle = new Battle(CONTAINER, 32, socket);
            battle.animate();
        }
    }

    battleStart = () => {
        const {socket, onStartBattle: onBattleStart} = this.props;
        onBattleStart();
        socket.send('BATTLE_START');
    };

    battleCancel = () => {
        const {socket, onCancelBattle: onBattleCancel} = this.props;
        onBattleCancel();
        socket.send('BATTLE_CANCEL');
    };

    renderSearchingOpponent() {
        return <div>
            <div>Searching opponent</div>
            <button onClick={this.battleCancel}>Cancel</button>
        </div>
    }

    renderPreparing() {
        const {battleStatus} = this.props;
        return <div>
            {battleStatus === BATTLE_STATUS_PREPARING && <div className={styles.preparing}>PREPARING</div>}
            <div id={CONTAINER}/>
        </div>;
    }

    render() {
        const {battleStatus} = this.props;
        if (battleStatus === BATTLE_STATUS_SEARCHING_OPPONENT) {
            return this.renderSearchingOpponent();
        }
        if (battleStatus === BATTLE_STATUS_PREPARING || battleStatus === BATTLE_STATUS_IN_PROGRESS) {
            return this.renderPreparing();
        }
        return (
            <div className={styles.container}>
                <button onClick={this.battleStart}>Battle</button>
            </div>
        );
    }
}
