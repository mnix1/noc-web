import styles from './style.css';
import React from 'react';

export default class TopMenu extends React.Component {

    get containerStyle() {
        const {height, leftMenuWidth} = this.props;
        return {height, width: `calc(100% - ${leftMenuWidth}px)`, left: leftMenuWidth};
    }

    render() {
        return (
            <div className={styles.container} style={this.containerStyle}>
                <div></div>
            </div>
        );
    }
}
