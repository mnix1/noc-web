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
    }

    componentDidUpdate() {
        this.battleInit();
    }

    battleInit() {
        const {battleStatus} = this.props;
        if (battleStatus === BATTLE_STATUS_IN_PROGRESS && battle === undefined) {
            battle = new Battle(CONTAINER, 32);
            battle.animate();
        }
    }

    battleStart = () => {
        const {socket, onStartBattle: onBattleStart} = this.props;
        socket.send('BATTLE_START');
        onBattleStart();
    };

    battleCancel = () => {
        const {socket, onCancelBattle: onBattleCancel} = this.props;
        socket.send('BATTLE_CANCEL');
        onBattleCancel();
    };

    renderSearchingOpponent() {
        return <div>
            <div>Searching opponent</div>
            <button onClick={this.battleCancel}>Cancel</button>
        </div>
    }

    renderPreparing() {
        return <div>
            <div>Preparing</div>
        </div>
    }

    renderInProgress() {
        return <div id={CONTAINER}/>;
    }

    render() {
        const {battleStatus} = this.props;
        if (battleStatus === BATTLE_STATUS_SEARCHING_OPPONENT) {
            return this.renderSearchingOpponent();
        }
        if (battleStatus === BATTLE_STATUS_PREPARING) {
            return this.renderPreparing();
        }
        if (battleStatus === BATTLE_STATUS_IN_PROGRESS) {
            return this.renderInProgress();
        }
        return (
            <div className={styles.container}>
                <button onClick={this.battleStart}>Battle</button>
            </div>
        );
    }
}
