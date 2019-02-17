import * as React from 'react';

let counter = 1;

export interface Props {
    children: (
        id: string
    ) => React.ReactNode;
}

export default class IDCounter extends React.Component<Props> {
    state = {
        counter: counter++
    };

    public render() {
       return this.props.children('IDCounter-id-' + this.state.counter);
    }
}
