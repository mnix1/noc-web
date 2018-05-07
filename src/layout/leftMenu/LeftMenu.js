import styles from './style.css';
import React from 'react';
import logo from '../../content/logo/logo2.png';
import {PAGES} from "../config";
import cn from 'classnames';

export default class LeftMenu extends React.Component {

    get containerStyle() {
        const {width} = this.props;
        return {width};
    }

    renderItem = ({id, label}) => {
        const {page, onPageChange} = this.props;
        return <li onClick={() => {
            if (page !== id) {
                onPageChange(id);
            }
        }} className={cn({[styles.active]: id === page})} key={id} id={id}>{label}</li>
    };

    render() {
        return (
            <div className={styles.container} style={this.containerStyle}>
                <div><img src={logo} width={this.props.width} alt=""/></div>
                <ul>
                    {PAGES.map(this.renderItem)}
                </ul>
            </div>
        );
    }
}
