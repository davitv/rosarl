const styles = require('./CallbackForm.css');

import * as React from 'react';
import { Formik, Field, FormikErrors, FormikActions } from 'formik';

import TextInput from '../text-input';
import UniqueID from '../unique-id';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

export interface FormValues {
    name: string;
    phone: string;
}

export interface Props {
    onSubmit: (values: FormValues) => Promise<void>;
}

export default class CallbackForm extends React.Component<Props> {
    public render() {
        return (
            <div className={styles.className}>
                <Formik
                    initialValues={{
                        name: '',
                        phone: '',
                    }}
                    onSubmit={(values: FormValues, actions: FormikActions<FormValues>) => {
                        actions.setSubmitting(true);
                        return this.props.onSubmit(values).catch(err => {

                            actions.setErrors(err);
                            actions.setSubmitting(false);
                            if (err._error) {
                                actions.setStatus(
                                    'Произошла ошибка. Пожалуйста, повторите позже.'
                                );
                                console.error('Request phone call server error.');
                                console.error(err);
                            }

                            if (err.non_field_errors) {
                                actions.setStatus(
                                    err.non_field_errors
                                );
                            }
                        });
                    }}
                    validate={(values: Partial<FormValues>) => {
                        const err: FormikErrors<FormValues> = {};
                        if (!values.name) {
                            err.name = 'Пожалуйста, введите Ваше имя.';
                        }
                        if (!values.phone) {
                            err.phone = 'Пожалуйста, введите номер телефона.';
                        }
                        return err;
                    }}
                >
                    {({
                        handleSubmit,
                        touched,
                        errors,
                        status,
                        error,
                        isSubmitting,
                    }) =>
                        <form
                            onSubmit={handleSubmit}
                            className={styles.form}
                        >
                            <UniqueID>
                            {(id) =>
                                <div className={styles.field}>
                                    <label htmlFor={id}>Ваше имя</label>
                                    <Field
                                        id={id}
                                        name="name"
                                        component={TextInput}
                                    />
                                    {errors.name && touched.name &&
                                        <div
                                            className={styles.fieldError}
                                        >
                                            {errors.name}
                                        </div>
                                    }
                                </div>
                            }
                            </UniqueID>

                            <UniqueID>
                            {(id) =>
                                <div className={styles.field}>
                                    <label htmlFor={id}>Номер телефона</label>
                                    <Field
                                        id={id}
                                        name="phone"
                                        component={TextInput}
                                    />
                                    {errors.phone && touched.phone &&
                                        <div
                                            className={styles.fieldError}
                                        >
                                            {errors.phone}
                                        </div>
                                    }
                                </div>
                            }
                            </UniqueID>
                            {status &&
                                <div className={styles.error}>
                                     {status}
                                </div>
                            }
                            <button
                                className={styles.button}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ?
                                    <span>
                                        <Icon icon="spinner" spin fixedWidth />
                                        Отправка запроса...
                                    </span>
                                    :
                                    <span>
                                        Подтвердить
                                    </span>
                                }
                            </button>
                        </form>
                    }
                </Formik>
            </div>
        );
    }
}