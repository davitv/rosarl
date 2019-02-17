const styles = require('./Header.css');

import * as React from 'react';
import cx from 'classnames';

import { Location } from 'history';
import { Link, NavLink, withRouter } from 'react-router-dom';

import TextInput from '../form-fields/TextInput';

const TEXT = `
Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Illo, ratione, corrupti. Corporis eveniet rem, soluta non aut.
Facere tempore accusamus excepturi ducimus ullam cumque eius
provident veniam, sed enim modi!
`;


class Header extends React.Component {
    constructor(props: {}) {
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLoginCloseClick = this.handleLoginCloseClick.bind(this);
    }
    public render() {
        return (
            <div className={styles.className}>

                <div className={styles.logo}>
                    <h1 className={styles.title}>
                        <a href="/" className={styles.link}>
                            Росар-Л
                            <small className={styles.phone}>
                                +7(499) 248-09-09
                            </small>
                        </a>
                    </h1>
                </div>

                <div className={styles.floatLeft}>
                    <div className={styles.navigation}>
                        <div className={styles.item}>
                            <a href="#" className={styles.navigationLink}>
                                <i className={styles.icon}>o</i>
                                О Компании
                            </a>
                            <div
                                className={cx(
                                    styles.dropdown,
                                    styles.dropdownOpen
                                )}
                            >
                                <div className={styles.dropdownContent}>
                                    {TEXT}
                                </div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <a href="#" className={styles.navigationLink}>
                                <i className={styles.icon}>o</i>
                                Поставщики
                            </a>
                            <div className={styles.dropdown}>
                                <div className={styles.dropdownContent}>
                                    {TEXT}
                                </div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <a href="#" className={styles.navigationLink}>
                                <i className={styles.icon}>o</i>
                                Прайс-лист
                            </a>
                            <div className={styles.dropdown}>
                                <div className={styles.dropdownContent}>
                                    {TEXT}
                                </div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <a href="#" className={styles.navigationLink}>
                                <i className={styles.icon}>o</i>
                                Скидки
                            </a>
                            <div className={styles.dropdown}>
                                <div className={styles.dropdownContent}>
                                    {TEXT}
                                </div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <a href="#" className={styles.navigationLink}>
                                <i className={styles.icon}>o</i>
                                Оплата
                            </a>
                            <div className={styles.dropdown}>
                                <div className={styles.dropdownContent}>
                                    {TEXT}
                                </div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <a href="#" className={styles.navigationLink}>
                                <i className={styles.icon}>o</i>
                                Доставка
                            </a>
                            <div className={styles.dropdown}>
                                <div className={styles.dropdownContent}>
                                    {TEXT}
                                </div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <a href="#" className={styles.navigationLink}>
                                <i className={styles.icon}>o</i>
                                Контакты
                            </a>
                            <div className={styles.dropdown}>
                                <div className={styles.dropdownContent}>
                                    {TEXT}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.floatRight}>
                    <div className={styles.navigation}>
                        <div className={styles.item}>
                            <a href="#" className={styles.navigationLink}>
                                <i className={styles.icon}>o</i>
                                Звонок
                            </a>
                            <div
                                className={cx(
                                    styles.dropdown,
                                    styles.dropdownOpen,
                                    styles.dropdownSmall,
                                )}
                            >
                                <div className={styles.dropdownContent}>
                                    {TEXT}
                                </div>
                            </div>

                        </div>
                        <div className={styles.item}>
                            <a href="#" className={styles.navigationLink}>
                                <i className={styles.icon}>o</i>
                                Корзина
                            </a>
                            <div className={styles.dropdown}>
                                <div className={styles.dropdownContent}>
                                    {TEXT}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private handleLogoutClick(e: React.SyntheticEvent<HTMLAnchorElement>) {
        e.preventDefault();
    }

    private handleLoginClick(e: React.SyntheticEvent<HTMLAnchorElement>) {
        e.preventDefault();
    }

    private handleLoginCloseClick(e?: React.SyntheticEvent<HTMLAnchorElement>) {
        if (e !== undefined) {
            e.preventDefault();
        }
    }
}

export default Header;
