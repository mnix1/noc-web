import styles from './style.css';
import React from 'react';
import {commit} from './createTeam/CreateTeamMutation';

export default class Team extends React.Component {

    constructor(props) {
        super(props);
        this.state = {profileName: props.profile.name};
    }

    handleProfileNameChange = (e) => {
        this.setState({profileName: e.target.value});
    };

    updateProfileName = () => {
        commit(this.props.relay.environment, this.state.profileName);
    };

    render() {
        return (
            <div className={styles.profile}>
                Id:
                {this.props.profile.id}
                <br/>
                Tag:
                {this.props.profile.tag}
                <br/>
                <div>
                    Name:
                    {this.props.profile.name}
                    <input type="text" value={this.state.profileName} onChange={this.handleProfileNameChange}/>
                    <button onClick={this.updateProfileName}>Update name</button>
                </div>
            </div>
        );
    }
}
