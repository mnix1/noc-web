import styles from './style.css';
import React from 'react';

export default class DeckPage extends React.Component {

    render() {
        console.log('DeckPage', this.props)
        return (
            <div className={styles.container}>
                DECK PAGE
            </div>
        );
    }
}
