import _ from 'lodash';
import styles from './style.css';
import React from 'react';
import Champion from "../../../component/collection/champion/Champion";
import Card from "../../../component/collection/card/Card";

export default class DeckPage extends React.Component {

    renderCards(deckCards) {
        const {cards} = this.props;
        return _(deckCards)
            .sortBy('position')
            .map(deckCard => _.find(cards, {id: deckCard.card.id}))
            .map(card => <Card key={card.id} {...card}/>)
            .value();
    }

    renderChampion(deckChampion) {
        const {champions} = this.props;
        return <Champion {..._.find(champions, {id: deckChampion.id})}/>
    }

    renderDeck(deck) {
        return <div key={deck.id}>
            <span>{deck.name}</span>
            <br/>
            {this.renderChampion(deck.champion)}
            <br/>
            {this.renderCards(deck.cards)}
        </div>
    }

    render() {
        // console.log('DeckPage', this.props)
        return (
            <div className={styles.container}>
                {this.props.decks.map(e => this.renderDeck(e))}
            </div>
        );
    }
}
