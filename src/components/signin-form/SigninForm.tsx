const styles = require('./SigninForm.css');

import * as React from 'react';
import { Formik, Field, FormikErrors, FormikActions } from 'formik';

import TextInput from '../text-input';
import PasswordInput from '../password-input';
import UniqueID from '../unique-id';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

export interface FormValues {
    username: string;
    password: string;
}

export interface Props {
    onSubmit: (values: FormValues) => Promise<void>;
}

export default class SigninForm extends React.Component<Props> {
    public render() {
        return (
            <div className={styles.className}>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
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
                        if (!values.username) {
                            err.username = 'Пожалуйста, введите логин.';
                        }
                        if (!values.password) {
                            err.password = 'Пожалуйста, введите пароль.';
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
                                    <label htmlFor={id}>Логин</label>
                                    <Field
                                        id={id}
                                        name="username"
                                        component={TextInput}
                                    />
                                    {errors.username && touched.username &&
                                        <div
                                            className={styles.fieldError}
                                        >
                                            {errors.username}
                                        </div>
                                    }
                                </div>
                            }
                            </UniqueID>

                            <UniqueID>
                            {(id) =>
                                <div className={styles.field}>
                                    <label htmlFor={id}>Пароль</label>
                                    <Field
                                        id={id}
                                        name="password"
                                        component={PasswordInput}
                                    />
                                    {errors.password && touched.password &&
                                        <div
                                            className={styles.fieldError}
                                        >
                                            {errors.password}
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