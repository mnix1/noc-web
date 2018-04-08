import {connect} from 'react-redux'
import {createFragmentContainer, graphql} from "react-relay/compat";
import CardPage from "./CardPage";

const CardPageContainer = createFragmentContainer(
    CardPage,
    graphql`
        fragment CardPageContainer_cards on Card @relay(plural: true) {
            id
            name
            type
            rarity
        }
    `
);

const mapStateToProps = (state, props) => {
    console.log('props', props);
    return {
        cards: props.queryData.cards
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CardPageContainer);