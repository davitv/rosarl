import * as React from 'react';

const styles = require('./PasswordInput.css');


export type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default (props: Props) => <input type="password" className={styles.className} {...props} />;