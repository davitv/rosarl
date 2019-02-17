const styles = require('./TextInput.css');

import * as React from 'react';

export interface Props {
    label?: string;
    placeholder?: string;
}

export default class TextInput extends React.Component<Props> {
    public render() {
        const {
            label,
            placeholder,
        } = this.props;

        return (
            <div className={styles.className}>
                {label &&
                    <label>{label}</label>
                }
                <input type="text" />
            </div>
        );
    }
}