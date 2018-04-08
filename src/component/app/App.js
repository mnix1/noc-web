import React from 'react';
import {graphql, QueryRenderer} from 'react-relay/compat';
import environment from '../../createRelayEnvironment';
import Layout from "../../layout/Layout";

export default class App extends React.Component {

    renderQuery(){
        return <QueryRenderer
            environment={environment}
            query={graphql`
                query AppProfileQuery($profileId: Long!) {
                    profile(id: $profileId) {
                        ...ProfileContainer_profile
                    }
                    cards {
                        ...CardPageContainer_cards
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
                    console.log(props.profile);
                    return <Layout queryData={props}/>;
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
