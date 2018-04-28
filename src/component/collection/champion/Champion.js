import styles from './style.css';
import React from 'react';

export default class Champion extends React.PureComponent {

    render() {
        const {firstName, nickName, lastName} = this.props;
        const name = `${firstName} "${nickName}" ${lastName}`;
        return (
            <div className={styles.container}>
                {name}
                <br/>
                {this.props.type}
                <br/>
                {this.props.rarity}
            </div>
        );
    }
}
