import {connect} from 'react-redux'
import DeckPage from "./DeckPage";
import {createFragmentContainer, graphql} from "react-relay/compat";

const DeckPageContainer = createFragmentContainer(
    DeckPage,
    graphql`
        fragment DeckPageContainer_decks on Deck @relay(plural: true) {
            id
            name
            position
        }
    `
);


const mapStateToProps = (state, props) => {
    console.log('DeckPageContainer', props)
    return {
        // decks:
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckPageContainer);