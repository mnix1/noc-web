import './app.css';
import React from 'react';
import {graphql, QueryRenderer} from 'react-relay/compat';
import environment from '../../createRelayEnvironment';
import Logout from "../auth/Logout";
import ProfileContainer from "../profile/ProfileContainer";

export default class App extends React.Component {

    renderQuery(){
        return <QueryRenderer
            environment={environment}
            query={graphql`
                query AppProfileQuery($profileId: Long!) {
                    profile(id: $profileId) {
                        ...ProfileContainer_profile
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
                    return <ProfileContainer profile={props.profile}/>;
                }
                return <div>Loading</div>;
            }}
        />
    }

    render() {
        return (
            <div className="App">
                {this.renderQuery()}
                <Logout/>
            </div>
        );
    }
}
