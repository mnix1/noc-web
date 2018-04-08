import styles from './style.css';
import React from 'react';
import Card from "../../../component/collection/card/Card";

export default class CardPage extends React.Component {

    renderCard(card) {
        return <Card {...card}/>;
    }

    render() {
        console.log('cards', this.props);
        return (
            <div className={styles.container}>
                {this.props.cards.map(e => this.renderCard(e))}
            </div>
        );
    }
}
