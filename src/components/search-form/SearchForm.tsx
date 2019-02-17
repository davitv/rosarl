import * as React from 'react';
import { Formik, Field } from 'formik';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const styles = require('./SearchForm.css');

export interface FormValues {
    keyword: string;
}

export interface Props {
    onSubmit: (values: FormValues) => Promise<void>;
}

export default class SearchForm extends React.Component<Props> {
    public render() {
        return (
            <div className={styles.className} >
                <Formik
                    initialValues={{
                        keyword: ''
                    }}
                    onSubmit={(values: FormValues, actions) => {
                        this.props.onSubmit(values).then(_ => {
                            actions.setSubmitting(false)
                        });
                    }}
                >
                    {(props) =>
                        <form
                            onSubmit={props.handleSubmit}
                            className={styles.form}
                        >
                            <Field
                                name="keyword"
                                className={styles.input}
                            />
                            <button
                                type="submit"
                                className={styles.button}
                                disabled={props.isSubmitting}
                            >
                                {props.isSubmitting ?
                                    <Icon icon="spinner" spin />
                                    :
                                    <Icon icon="search" />
                                }
                            </button>
                        </form>
                    }
                </Formik>
            </div>
        );
    }
}