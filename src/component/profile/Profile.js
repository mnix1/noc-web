import React from 'react';
import {commit} from './UpdateProfileNameMutation';

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {profileName: props.profile.name};
    }

    handleProfileNameChange = (e) => {
        this.setState({profileName: e.target.value});
    }

    updateProfileName = () => {
        commit(this.props.relay.environment, this.props.profile.id, this.state.profileName);
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.profileName} onChange={this.handleProfileNameChange}/>
                {this.props.profile.id}
                <br/>
                {this.props.profile.tag}
                <br/>
                {this.props.profile.name}
                <button onClick={this.updateProfileName}>Update name</button>
            </div>
        );
    }
}
