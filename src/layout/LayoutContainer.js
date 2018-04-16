import {createFragmentContainer, graphql} from 'react-relay/compat';
import Layout from "./Layout";

export default createFragmentContainer(
    Layout,
    graphql`
        fragment LayoutContainer_profile on Profile {
            id
            tag
            name
            decks {
                ...DeckPageContainer_decks
            }
        }
    `
);
