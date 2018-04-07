import {connect} from 'react-redux'
import Content from "./Content";

const mapStateToProps = (state) => {
    return {
        page: state.page.page,
        screen: state.screen
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);