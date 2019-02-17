import * as React from 'react';
import { FieldProps } from 'formik';

import TextInput from './TextInput';

export interface Props extends FieldProps {
    id?: string;
}

export class TextInputFormikWrapper extends React.Component<Props> {
    public render() {
        const {
            id,
            field
        } = this.props;

        return (
            <TextInput
                id={id}
                name={name}
                {...field}
            />
        );
    }
}

export default TextInputFormikWrapper;