import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay/compat';

class Profile extends React.Component {
    render() {
        return <div>
            {this.props.profile.tag}
            {this.props.profile.name}
        </div>;
    }
}

export default createFragmentContainer(Profile, graphql`
    fragment Profile_profile on Profile {
        id,
        tag,
        name
    }
`);
