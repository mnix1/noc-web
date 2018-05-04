import {connect} from 'react-redux'
import BattlePage from "./BattlePage";
import {
    BATTLE_STATUS_SEARCHING_OPPONENT,
    battleStatusChanged
} from "../../../redux/reducer/battle";

const mapStateToProps = (state) => {
    const {battleStatus} = state.battle;
    const {socket} = state.socket;
    return {
        socket,
        battleStatus
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStartBattle: () => {
            dispatch(battleStatusChanged(BATTLE_STATUS_SEARCHING_OPPONENT))
        },
        onCancelBattle: () => {
            dispatch(battleStatusChanged(undefined))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BattlePage);