import * as React from 'react';

import DeliveryForm, { FormValues } from './DeliveryForm';


export class DeliveryFormContainer extends React.Component {
    constructor(props: {}) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    public render() {
        return (
            <DeliveryForm
                onSubmit={this.handleSubmit}
            />
        );
    }

    private handleSubmit(values: FormValues) {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }
}

export default DeliveryFormContainer;