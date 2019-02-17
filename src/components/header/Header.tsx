const styles = require('./Header.css');
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import * as React from 'react';
import cx from 'classnames';

import { Location } from 'history';
import { Link, NavLink, withRouter } from 'react-router-dom';

import TextInput from '../form-fields/TextInput';
import Dropdown from '../dropdown';


const TEXT = `
Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Illo, ratione, corrupti. Corporis eveniet rem, soluta non aut.
Facere tempore accusamus excepturi ducimus ullam cumque eius
provident veniam, sed enim modi!
`;

const loaderURL = require('../../assets/loader-white.png');

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
                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div className={styles.item}>
                                    <a
                                        href="#"
                                        className={styles.navigationLink}
                                        ref={togglerRef}
                                    >
                                        <i className={styles.icon}><Icon icon="building" /></i>
                                        О Компании
                                    </a>
                                    <div
                                        className={cx(
                                            styles.dropdown,
                                            {[styles.dropdownOpen]: isOpen}
                                        )}
                                    >
                                        <div className={styles.dropdownContent}>
                                            Hey!
                                        </div>
                                    </div>
                                </div>
                            }
                        </Dropdown>
                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div className={styles.item}>
                                    <a
                                        href="#"
                                        className={styles.navigationLink}
                                        ref={togglerRef}
                                    >
                                        <i className={styles.icon}><Icon icon="users" /></i>
                                        Поставщики
                                    </a>
                                    <div
                                        className={cx(
                                            styles.dropdown,
                                            {[styles.dropdownOpen]: isOpen}
                                        )}
                                    >
                                        <div className={styles.dropdownContent}>
                                            You!
                                        </div>
                                    </div>
                                </div>
                            }
                        </Dropdown>
                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div className={styles.item}>
                                    <a
                                        href="#"
                                        className={styles.navigationLink}
                                        ref={togglerRef}
                                    >
                                        <i className={styles.icon}><Icon icon="file-alt" /></i>
                                        Прайс-лист
                                    </a>
                                    <div
                                        className={cx(
                                            styles.dropdown,
                                            {[styles.dropdownOpen]: isOpen}
                                        )}
                                    >
                                        <div className={styles.dropdownContent}>
                                            See
                                        </div>
                                    </div>
                                </div>
                            }
                        </Dropdown>

                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div className={styles.item}>
                                    <a
                                        href="#"
                                        className={styles.navigationLink}
                                        ref={togglerRef}
                                    >
                                        <i className={styles.icon}><Icon icon="sort-numeric-down" /></i>
                                        Скидки
                                    </a>
                                    <div
                                        className={cx(
                                            styles.dropdown,
                                            {[styles.dropdownOpen]: isOpen}
                                        )}
                                    >
                                        <div className={styles.dropdownContent}>
                                            me
                                        </div>
                                    </div>
                                </div>
                            }
                        </Dropdown>

                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div className={styles.item}>
                                    <a
                                        href="#"
                                        className={styles.navigationLink}
                                        ref={togglerRef}
                                    >
                                        <i className={styles.icon}><Icon icon="money-bill" /></i>
                                        Оплата
                                    </a>
                                    <div
                                        className={cx(
                                            styles.dropdown,
                                            {[styles.dropdownOpen]: isOpen}
                                        )}
                                    >
                                        <div className={styles.dropdownContent}>
                                            Pictures
                                        </div>
                                    </div>
                                </div>
                            }
                        </Dropdown>
                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div className={styles.item}>
                                    <a
                                        href="#"
                                        className={styles.navigationLink}
                                        ref={togglerRef}
                                    >
                                        <i className={styles.icon}><Icon icon="truck" /></i>
                                        Доставка
                                    </a>
                                    <div
                                        className={cx(
                                            styles.dropdown,
                                            {[styles.dropdownOpen]: isOpen}
                                        )}
                                    >
                                        <div className={styles.dropdownContent}>
                                            crazy
                                        </div>
                                    </div>
                                </div>
                            }
                        </Dropdown>

                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div className={styles.item}>
                                    <a
                                        href="#"
                                        className={styles.navigationLink}
                                        ref={togglerRef}
                                    >
                                        <i className={styles.icon}><Icon icon="envelope" /></i>
                                        Контакты
                                    </a>
                                    <div
                                        className={cx(
                                            styles.dropdown,
                                            {[styles.dropdownOpen]: isOpen}
                                        )}
                                    >
                                        <div className={styles.dropdownContent}>
                                            Silent
                                        </div>
                                    </div>
                                </div>
                            }
                        </Dropdown>
                    </div>
                </div>
                <div className={styles.floatRight}>
                    <div className={styles.navigation}>

                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div className={styles.item}>
                                    <a
                                        href="#"
                                        className={styles.navigationLink}
                                        ref={togglerRef}
                                    >
                                        <i className={styles.icon}><Icon icon="phone" /></i>
                                        Звонок
                                    </a>
                                    <div
                                        className={cx(
                                            styles.dropdown,
                                            styles.dropdownSmall,
                                            {[styles.dropdownOpen]: isOpen}
                                        )}
                                    >
                                        <div className={styles.dropdownContent}>
                                            {TEXT}
                                        </div>
                                    </div>
                                </div>
                            }
                        </Dropdown>

                        <div className={styles.item}>
                            <a href="#" className={styles.navigationLink}>
                                <span className={styles.cartInfo}>
                                    12
                                    <i className={styles.icon}>
                                        <img src={loaderURL} alt="Корзина" className={styles.loaderIconImage} />
                                    </i>
                                </span>
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
