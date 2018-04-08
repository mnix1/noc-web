import styles from './style.css';
import React from 'react';
import LeftMenuContainer from "./leftMenu/LeftMenuContainer";
import ContentContainer from "./content/ContentContainer";
import TopMenuContainer from "./topMenu/TopMenuContainer";

export default class Layout extends React.Component {

    render() {
        console.log('Layout render', this.props);
        return (
            <div className={styles.container}>
                <TopMenuContainer/>
                <LeftMenuContainer/>
                <ContentContainer queryData={this.props.queryData}/>
            </div>
        );
    }
}
