import styles from './style.css';
import React from 'react';
import {getPageComponent} from "../config";

export default class Content extends React.Component {

    get containerStyle() {
        const {screen} = this.props;
        return {
            width: `calc(100% - ${screen.leftMenuWidth}px)`,
            height: `calc(100% - ${screen.topMenuHeight}px)`,
            top: screen.topMenuHeight,
            left: screen.leftMenuWidth
        };
    }

    get pageProps() {
        const {screen, cards, champions, profile} = this.props;
        return {
            decks: profile.decks,
            champions,
            cards,
            width: screen.width - screen.leftMenuWidth,
            height: screen.height - screen.topMenuHeight,
        }
    }

    renderPage() {
        console.log('Content', this.pageProps);
        return React.createElement(getPageComponent(this.props.page), this.pageProps);
    }

    render() {
        return (
            <div className={styles.container} style={this.containerStyle}>
                {this.renderPage()}
            </div>
        );
    }
}
