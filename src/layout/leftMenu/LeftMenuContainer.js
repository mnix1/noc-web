import {connect} from 'react-redux'
import LeftMenu from "./LeftMenu";
import {pageChanged} from "../../redux/reducer/page";

const mapStateToProps = (state) => {
    return {
        page: state.page.page,
        width: state.screen.leftMenuWidth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPageChange: (page) => dispatch(pageChanged(page))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);