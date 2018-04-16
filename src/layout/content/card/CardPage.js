import styles from './style.css';
import React from 'react';
import Card from "../../../component/collection/card/Card";

export default class CardPage extends React.Component {

    renderCard(card) {
        return <Card key={card.id} {...card}/>;
    }

    render() {
        return (
            <div className={styles.container}>
                {this.props.cards.map(e => this.renderCard(e))}
            </div>
        );
    }
}
