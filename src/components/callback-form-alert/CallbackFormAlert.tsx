import * as React from 'react';

const styles = require('./CallbackFormAlert.css');

export interface Props {
    submittedBy: string;
    phone: string;
}

export default class CallbackFormAlert extends React.Component<Props> {
    public render() {
        return (
            <div className={styles.className}>
                Спасибо, {this.props.submittedBy}! Наш менеджер свяжется с вами через 15 мин.
            </div>
        );
    }
}