import * as React from 'react';

const styles = require('./TextInput.css');


export type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default (props: Props) => <input type="text" className={styles.className} {...props} />;