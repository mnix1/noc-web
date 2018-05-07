import {connect} from 'react-redux'
import CardPage from "./CardPage";

// const CardPageContainer = createFragmentContainer(
//     CardPage,
//     graphql`
//         fragment CardPageContainer_cards on Card @relay(plural: true) {
//             id
//             name
//             type
//             rarity
//         }
//     `
// );

const mapStateToProps = (state, props) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);