import {createFragmentContainer, graphql} from 'react-relay/compat';
import Profile from "./Profile";

export default createFragmentContainer(
    Profile,
    graphql`
        fragment ProfileContainer_profile on Profile {
            id
            tag
            name
        }
    `
);
