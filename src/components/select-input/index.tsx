import * as React from 'react';
import { FieldProps } from 'formik';

import SelectInput from './SelectInput';

export interface Props extends FieldProps {
    id?: string;
    options: [string, number | string][];
}

export class SelectInputFormikWrapper extends React.Component<Props> {
    public render() {
        const {
            id,
            options,
            field
        } = this.props;

        return (
            <SelectInput
                id={id}
                options={options}
                name={name}
                {...field}
            />
        );
    }
}

export default SelectInputFormikWrapper;