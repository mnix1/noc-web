import {connect} from 'react-redux'
import TopMenu from "./TopMenu";

const mapStateToProps = (state) => {
    return {
        height: state.screen.topMenuHeight,
        leftMenuWidth: state.screen.leftMenuWidth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);