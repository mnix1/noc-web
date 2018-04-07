import styles from './style.css';
import React from 'react';
import TopMenu from "./topMenu/TopMenu";
import LeftMenuContainer from "./leftMenu/LeftMenuContainer";
import {LEFT_MENU_WIDTH, TOP_MENU_HEIGHT} from "./leftMenu/leftMenuConfig";

export default class Layout extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                <TopMenu leftMenuWidth={LEFT_MENU_WIDTH} height={TOP_MENU_HEIGHT} profile={this.props.profile}/>
                <LeftMenuContainer width={LEFT_MENU_WIDTH}/>

                <div className={styles.content}>

                </div>
            </div>
        );
    }
}
