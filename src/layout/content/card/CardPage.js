import styles from './style.css';
import React from 'react';
import Card from "../../../component/collection/card/Card";
import Champion from "../../../component/collection/champion/Champion";

export default class CardPage extends React.PureComponent {

    renderChampion(champion) {
        return <Champion key={champion.id} {...champion}/>;
    }

    renderCard(card) {
        return <Card key={card.id} {...card}/>;
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.champions}>
                    {this.props.champions.map(e => this.renderChampion(e))}
                </div>
                <div className={styles.cards}>
                {this.props.cards.map(e => this.renderCard(e))}
                </div>
            </div>
        );
    }
}
