import React from 'react';
import './App.css';
import {QueryRenderer, graphql} from 'react-relay/compat';
import environment from '../createRelayEnvironment';
import Profile from './Profile';

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <QueryRenderer
                    environment={environment}
                    query={graphql`
                        query AppProfileQuery($profileId: Long!) {
                            profile(id: $profileId) {
                                ...Profile_profile
                            }
                        }
                    `}
                    variables={{
                        profileId: 7
                    }}
                    render={({error, props}) => {
                        if (error) {
                            return <div>{error.message}</div>;
                        } else if (props) {
                            console.log(props.profile);
                            return <Profile profile={props.profile}/>;
                        }
                        return <div>Loading</div>;
                    }}
                />
            </div>
        );
    }
}
