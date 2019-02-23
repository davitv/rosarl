import * as React from 'react';

const styles = require('./SelectInput.css');


export interface Props extends React.InputHTMLAttributes<HTMLSelectElement> {
    options: [string, string | number ][];
}

export default ({options, ...props}: Props) => (
    <select className={styles.className} {...props} >
        {options.map(([value, displayName]) => <option key={value} value={value}>{displayName}</option>)}
    </select>
);