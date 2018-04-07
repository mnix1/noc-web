import styles from './createTeam.css';
import React from 'react';
import {commit} from './CreateTeamMutation';

export default class CreateTeam extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: ''};
    }

    handleNameChange = (e) => {
        this.setState({name: e.target.value});
    };

    createTeam = () => {
        commit(this.props.relay.environment, this.state.name);
    };

    render() {
        return (
            <div className={styles.container}>
                <div>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
                    <button onClick={this.createTeam}>Create team</button>
                </div>
            </div>
        );
    }
}
