import * as React from 'react';
import { FieldProps } from 'formik';

import TextInput from './TextInput';

export interface Props extends FieldProps {
    id?: string;
    readOnly?: boolean;
}

export class TextInputFormikWrapper extends React.Component<Props> {
    public render() {
        const {
            id,
            field,
            readOnly
        } = this.props;

        return (
            <TextInput
                id={id}
                readOnly={readOnly}
                name={name}
                {...field}
            />
        );
    }
}

export default TextInputFormikWrapper;