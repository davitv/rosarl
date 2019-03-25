import * as React from 'react';
import { FieldProps } from 'formik';

import PasswordInput from './PasswordInput';

export interface Props extends FieldProps {
    id?: string;
}

export class PasswordInputFormikWrapper extends React.Component<Props> {
    public render() {
        const {
            id,
            field
        } = this.props;

        return (
            <PasswordInput
                id={id}
                name={name}
                {...field}
            />
        );
    }
}

export default PasswordInputFormikWrapper;