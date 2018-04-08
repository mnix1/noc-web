import styles from './style.css';
import React from 'react';

export default class Deck extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                {this.props.name}
            </div>
        );
    }
}
