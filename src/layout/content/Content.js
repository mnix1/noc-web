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
        const {screen, queryData} = this.props;
        return {
            queryData,
            width: screen.width - screen.leftMenuWidth,
            height: screen.height - screen.topMenuHeight,
        }
    }

    renderPage() {
        console.log('this.pageProps', this.pageProps);
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
