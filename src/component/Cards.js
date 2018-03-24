import React, {PureComponent} from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import Card from "./Card";


// class Cards extends PureComponent {
//     render() {
//         const cards = [{name: 'Wizard'}, {name: 'Warrior2'}];
//         return <div>
//             {cards.map(card => <Card card={card}/>)}
//         </div>;
//     }
// }
//
// export default createFragmentContainer(Cards, graphql`
//     fragment Cards_viewer on Viewer {
//
//     }
// `);
