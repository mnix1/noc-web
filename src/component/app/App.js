import React from 'react';
import {graphql, QueryRenderer} from 'react-relay/compat';
import environment from '../../createRelayEnvironment';
import LayoutContainer from "../../layout/LayoutContainer";
import CommunicationWebSocket from "./CommunicationWebSocket";
import BattlePageContainer from "../../layout/content/battle/BattlePageContainer";

export default class App extends React.Component {

    componentDidMount() {
        this.props.onInit(new CommunicationWebSocket());
    }

    renderQuery() {
        return <QueryRenderer
            environment={environment}
            query={graphql`
                query AppQuery($profileId: Long!) {
                    profile(id: $profileId) {
                        ...LayoutContainer_profile
                    }
                    champions {
                        id
                        firstName
                        nickName
                        lastName
                        kind
                        type
                        rarity
                        statistics {
                            property
                            value
                        }
                        cards {
                            card {
                                id
                            }
                        }
                    }
                    cards {
                        id
                        name
                        type
                        rarity
                        statistics {
                            property
                            value
                        }
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
        const {isBattleInProgress} = this.props;
        if (isBattleInProgress) {
            return <BattlePageContainer/>;
        }
        return (
            <div>
                {this.renderQuery()}
            </div>
        );
    }
}
