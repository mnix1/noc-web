import {connect} from 'react-redux'
import {socketCreated} from "../../redux/reducer/socket";
import App from "./App";
import {BATTLE_STATUS_IN_PROGRESS} from "../../redux/reducer/battle";

const mapStateToProps = (state) => {
    const {battleStatus} = state.battle;
    return {
        isBattleInProgress: battleStatus === BATTLE_STATUS_IN_PROGRESS
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInit: (socket) => {
            socket.setDispatch(dispatch);
            dispatch(socketCreated(socket));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);