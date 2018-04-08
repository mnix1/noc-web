import _ from 'lodash';
import DeckPageContainer from "./content/deck/DeckPageContainer";
import BattlePageContainer from "./content/battle/BattlePageContainer";
import CardPageContainer from "./content/card/CardPageContainer";

export const PAGES = [
    {label: 'Battle', id: 'battle', component: BattlePageContainer},
    {label: 'Deck', id: 'deck', component: DeckPageContainer},
    {label: 'Card', id: 'card', component: CardPageContainer},
    {label: 'Team', id: 'team', component: null},
    {label: 'Shop', id: 'shop', component: null},
    {label: 'Option', id: 'option', component: null}
];

export function getPageComponent(id) {
    return _.find(PAGES, {id}).component;
}