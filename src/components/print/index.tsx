import * as React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const styles = require('./Print.css');

export default class Print extends React.Component {
    public render() {
        return (
            <div className={styles.className}>
                <div className={styles.header}>
                    <div className={styles.logoWrapper}>
                        <h1 className={styles.headline}>ООО "РОСАР-Л"</h1>
                        <h3 className={styles.inn}>ИНН\КПП 7704245881\770401001</h3>
                    </div>
                    <div className={styles.info}>
                        Россия, 119435, г. Москва <br />
                        Большой Саввинский переулок, д. 9, стр.1 <br />
                        <span className={styles.contact}> <Icon icon="phone" /> +7(499) 248-09-09 </span>
                        <span className={styles.contact}> <Icon icon="envelope" /> info@rosar-l.ru </span>
                        <span className={styles.contact}> <Icon icon="globe-americas" /> www.rosar-l.ru </span>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}