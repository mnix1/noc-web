import React from 'react';
import {graphql, QueryRenderer} from 'react-relay/compat';
import environment from '../../createRelayEnvironment';
import LayoutContainer from "../../layout/LayoutContainer";

export default class App extends React.Component {

    renderQuery() {
        return <QueryRenderer
            environment={environment}
            query={graphql`
                query AppQuery($profileId: Long!) {
                    profile(id: $profileId) {
                        ...LayoutContainer_profile
                    }
                    cards {
                        id
                        name
                        type
                        rarity
                    }
                }
            `}
            variables={{
                profileId: this.props.profileId
            }}
            render={({error, props}) => {
                if (error) {
                    return <div>{error.message}</div>;
                } else if (props) {
                    console.log('App', props);
                    return <LayoutContainer {...props}/>;
                }
                return <div>Loading</div>;
            }}
        />
    }

    render() {
        return (
            <div>
                {this.renderQuery()}
            </div>
        );
    }
}
