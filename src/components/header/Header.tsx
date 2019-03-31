const styles = require('./Header.css');
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import * as React from 'react';
import cx from 'classnames';

import { Location } from 'history';
import { Link } from 'react-router-dom';
import { IMAGES_PATH_URL } from '../../products/constants';

import TextInput from '../form-fields/TextInput';
import Dropdown from '../dropdown';

import CallBackForm from '../callback-form';
import SigninForm from '../signin-form';

const loaderURL = require('../../assets/loader-white.png');


export interface Props {
    cartItemsAmount: number;
    aboutText: string;
    paymentText: string;
    paymentImageURL: string;
    isAuthenticated: boolean;
    contacts: {
        address: string;
        managers: [string, string][];
        route: string;
        routeScheme: string;
        textAfter: string;
        textBefore: string;
        warehouseAddress: string;
    };

    onCartClick: () => void;
}

class Header extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLoginCloseClick = this.handleLoginCloseClick.bind(this);
        this.handleCartClick = this.handleCartClick.bind(this);
    }

    public render() {
        const {
            aboutText,
            paymentText,
            contacts,
            isAuthenticated,
        } = this.props;
        const about = aboutText.split('\r\n');
        const payment = paymentText.split('\r\n');

        return (
            <div className={styles.className}>

                <div className={styles.logo}>
                    <h1 className={styles.title}>
                        <Link to="/" className={styles.link}>
                            Росар-Л
                            <small className={styles.phone}>
                                +7(499) 248-09-09
                            </small>
                        </Link>
                    </h1>
                </div>

                <div className={styles.floatLeft}>
                    <div className={styles.navigation}>
                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div
                                    className={cx(
                                        styles.item,
                                        {[styles.itemActive]: isOpen}
                                    )}
                                >
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
                                        ref={contentRef}
                                    >
                                        <div className={styles.dropdownContent}>
                                            <p>
                                                <button
                                                    type="button"
                                                    className={styles.btnPrint}
                                                >
                                                    <Icon icon="print" />
                                                </button>
                                            </p>
                                            {about.map((text, index) => <p key={index}>{text}</p>)}
                                        </div>
                                    </div>
                                </div>
                            }
                        </Dropdown>
                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div
                                    className={cx(
                                        styles.item,
                                        {[styles.itemActive]: isOpen}
                                    )}
                                >
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
                                        ref={contentRef}
                                    >
                                        <div className={styles.dropdownContent} />
                                    </div>
                                </div>
                            }
                        </Dropdown>
                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div
                                    className={cx(
                                        styles.item,
                                        {[styles.itemActive]: isOpen}
                                    )}
                                >
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
                                        ref={contentRef}
                                    >
                                        <div className={styles.dropdownContent} />
                                    </div>
                                </div>
                            }
                        </Dropdown>

                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div
                                    className={cx(
                                        styles.item,
                                        {[styles.itemActive]: isOpen}
                                    )}
                                >
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
                                        ref={contentRef}
                                    >
                                        <div className={styles.dropdownContent} />
                                    </div>
                                </div>
                            }
                        </Dropdown>

                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div
                                    className={cx(
                                        styles.item,
                                        {[styles.itemActive]: isOpen}
                                    )}
                                >
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
                                        ref={contentRef}
                                    >
                                        <div className={styles.dropdownContent}>
                                            <p>
                                                <button
                                                    type="button"
                                                    className={styles.btnPrint}
                                                >
                                                    <Icon icon="print" />
                                                </button>
                                            </p>
                                            {payment.map((text, index) => <p key={index}>{text}</p>)}
                                        </div>
                                    </div>
                                </div>
                            }
                        </Dropdown>
                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div
                                    className={cx(
                                        styles.item,
                                        {[styles.itemActive]: isOpen}
                                    )}
                                >
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
                                        ref={contentRef}
                                    >
                                        <div className={styles.dropdownContent} />
                                    </div>
                                </div>
                            }
                        </Dropdown>

                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div
                                    className={cx(
                                        styles.item,
                                        {[styles.itemActive]: isOpen}
                                    )}
                                >
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
                                        ref={contentRef}
                                    >
                                        <div className={styles.dropdownContent}>
                                            <p>
                                                <button
                                                    type="button"
                                                    className={styles.btnPrint}
                                                >
                                                    <Icon icon="print" />
                                                </button>
                                            </p>
                                            <p>{contacts.address}</p>
                                            <p>{contacts.route}</p>
                                            <p>{contacts.textBefore}</p>
                                            {contacts.managers.map(([name, email], i) => <p key={i}>{name}: <a href={"mailto:" + email}>{email}</a></p>)}
                                            {contacts.textAfter.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                                            <p>{contacts.warehouseAddress}</p>
                                            <p><img src={contacts.routeScheme ? IMAGES_PATH_URL + contacts.routeScheme : ''} alt=""/></p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </Dropdown>
                    </div>
                </div>
                <div className={styles.floatRight}>
                    <div className={styles.navigation}>
                        {isAuthenticated ?
                            <div
                                className={cx(
                                    styles.item,
                                )}
                            >
                                <Link
                                    to="/account/"
                                    className={styles.navigationLink}
                                >
                                    <i className={styles.icon}><Icon icon="user" /></i>
                                    Аккаунт
                                </Link>
                            </div>
                            :
                            <Dropdown>
                                {(togglerRef, contentRef, isOpen) =>
                                    <div
                                        className={cx(
                                            styles.item,
                                            {[styles.itemActive]: isOpen}
                                        )}
                                    >
                                        <a
                                            href="#"
                                            className={styles.navigationLink}
                                            ref={togglerRef}
                                        >
                                            <i className={styles.icon}><Icon icon="user" /></i>
                                            Войти
                                        </a>
                                        <div
                                            className={cx(
                                                styles.dropdown,
                                                styles.dropdownSmall,
                                                {[styles.dropdownOpen]: isOpen}
                                            )}
                                            ref={contentRef}
                                        >
                                            <div className={styles.dropdownContent}>
                                                <SigninForm />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </Dropdown>
                        }

                        <Dropdown>
                            {(togglerRef, contentRef, isOpen) =>
                                <div
                                    className={cx(
                                        styles.item,
                                        {[styles.itemActive]: isOpen}
                                    )}
                                >
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
                                        ref={contentRef}
                                    >
                                        <div className={styles.dropdownContent}>
                                            <CallBackForm />
                                        </div>
                                    </div>
                                </div>
                            }
                        </Dropdown>

                        <div
                            className={cx(
                                styles.item
                            )}
                        >
                            <a
                                onClick={this.handleCartClick}
                                href="#"
                                className={styles.navigationLink}
                            >
                                <span className={styles.cartInfo}>
                                    {this.props.cartItemsAmount}
                                    <i className={styles.icon}>
                                        <img src={loaderURL} alt="Корзина" className={styles.loaderIconImage} />
                                    </i>
                                </span>
                                Корзина
                            </a>
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

    private handleCartClick(e: React.SyntheticEvent<HTMLAnchorElement>) {
        e.preventDefault();
        this.props.onCartClick();
    }
}

export default Header;
