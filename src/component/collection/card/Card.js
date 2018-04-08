import styles from './style.css';
import React from 'react';

export default class Card extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                {this.props.id}
                <br/>
                {this.props.name}
                <br/>
                {this.props.type}
                <br/>
                {this.props.rarity}
            </div>
        );
    }
}
