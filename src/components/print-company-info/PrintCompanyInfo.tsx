import * as React from 'react';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import cx from 'classnames';

import { Location } from 'history';
import { Link } from 'react-router-dom';

import { IMAGES_PATH_URL } from '../../products/constants';
import Print from '../print';

const styles = require('./PrintCompanyInfo.css');

export enum InfoType {
    ABOUT = 'about',
    PAYMENT = 'payment',
    CONTACTS = 'contacts',
}

export interface Props {
    aboutText: string;
    infoType: InfoType;
    paymentText: string;
    paymentImageURL: string;
    contacts: {
        address: string;
        managers: [string, string][];
        route: string;
        routeScheme: string;
        textAfter: string;
        textBefore: string;
        warehouseAddress: string;
    };
}


class PrintCompanyInfo extends React.Component<Props> {
    public componentDidMount() {
        print();
    }

    public render() {
        const {
            aboutText,
            paymentText,
            contacts,
            infoType,
        } = this.props;
        const about = aboutText.split('\r\n');
        const payment = paymentText.split('\r\n');

        return (
            <Print>
                <div className={styles.className}>
                    {infoType === InfoType.ABOUT &&
                        <div className={styles.about}>
                            {about.map((text, index) => <p key={index}>{text}</p>)}
                        </div>
                    }
                    {infoType === InfoType.PAYMENT &&
                        <div className={styles.payment}>
                            {payment.map((text, index) => <p key={index}>{text}</p>)}
                        </div>
                    }
                    {infoType === InfoType.CONTACTS &&
                        <div className={styles.contacts}>
                            <p>{contacts.address}</p>
                            <p>{contacts.route}</p>
                            <p>{contacts.textBefore}</p>
                            {contacts.managers.map(([name, email], i) => <p key={i}>{name}: <a href={"mailto:" + email}>{email}</a></p>)}
                            {contacts.textAfter.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                            <p>{contacts.warehouseAddress}</p>
                            <p><img className={styles.contactsRoute} src={contacts.routeScheme ? IMAGES_PATH_URL + contacts.routeScheme : ''} alt=""/></p>
                        </div>
                    }
                </div>
            </Print>
        );
    }
}

export default PrintCompanyInfo;
