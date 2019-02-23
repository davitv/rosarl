import * as React from 'react';
import cn from 'classnames';

import { Formik, Field, FormikErrors, FormikActions } from 'formik';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import TextInput from '../text-input';
import SelectInput from '../select-input';
import UniqueID from '../unique-id';


const styles = require('./DeliveryForm.css');


export enum DeliveryMethod {
    MOSCOW = 0,
    RUSSIA,
    PICKUP
}

export interface FormValues {
    full_name: string;
    method: DeliveryMethod;
    phone: string;
    address: string;
    city: string;

    // Russia delivery only
    carrier: number;
}

export interface Props {
    onSubmit: (values: FormValues) => Promise<void>;
}

export default class DeliveryForm extends React.Component<Props> {
    public render() {
        return (
            <div className={styles.className}>

                <Formik
                    initialValues={{
                        method: DeliveryMethod.MOSCOW,
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
                        setFieldValue,
                        values,
                    }) =>
                        <form
                            onSubmit={handleSubmit}
                            className={styles.form}
                        >
                            <div className={styles.methodChoices}>
                                <button
                                    type="button"
                                    onClick={() => setFieldValue('method', DeliveryMethod.MOSCOW)}
                                    value={DeliveryMethod.MOSCOW}
                                    className={cn(
                                        styles.methodChoice,
                                        {[styles.methodChoiceActive]: values.method === DeliveryMethod.MOSCOW}
                                    )}
                                >
                                    <Icon className={styles.deliveryIcon} icon="truck" />
                                    <br />
                                    Доставка по москве
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFieldValue('method', DeliveryMethod.RUSSIA)}
                                    value={DeliveryMethod.RUSSIA}
                                    className={cn(
                                        styles.methodChoice,
                                        {[styles.methodChoiceActive]: values.method === DeliveryMethod.RUSSIA}
                                    )}
                                >
                                    <Icon className={styles.deliveryIcon} icon="globe-americas" />
                                    <br />
                                    Доставка по России
                                </button>
                                <button
                                    type="button"
                                    value={DeliveryMethod.PICKUP}
                                    onClick={() => setFieldValue('method', DeliveryMethod.PICKUP)}
                                    className={cn(
                                        styles.methodChoice,
                                        {[styles.methodChoiceActive]: values.method === DeliveryMethod.PICKUP}
                                    )}
                                >
                                    <Icon className={styles.deliveryIcon} icon="user" />
                                    <br />
                                    Самовывоз
                                </button>
                            </div>

                            <div
                                className={cn(
                                    {[styles.hidden]: values.method === DeliveryMethod.PICKUP}
                                )}
                            >
                                <div className={styles.row}>
                                    <div className={styles.column50}>
                                        <UniqueID>
                                        {(id) =>
                                            <div className={styles.field}>
                                                <label htmlFor={id}>ФИО получателя</label>
                                                <Field
                                                    id={id}
                                                    name="full_name"
                                                    component={TextInput}
                                                />
                                                {errors.full_name && touched.full_name &&
                                                    <div
                                                        className={styles.fieldError}
                                                    >
                                                        {errors.full_name}
                                                    </div>
                                                }
                                            </div>
                                        }
                                        </UniqueID>
                                    </div>
                                    <div className={styles.column50}>
                                        <UniqueID>
                                        {(id) =>
                                            <div className={styles.field}>
                                                <label htmlFor={id}>Телефон</label>
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
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.column50}>
                                        <UniqueID>
                                        {(id) =>
                                            <div className={styles.field}>
                                                <label htmlFor={id}>Адрес</label>
                                                <Field
                                                    id={id}
                                                    name="address"
                                                    component={TextInput}
                                                />
                                                {errors.address && touched.address &&
                                                    <div
                                                        className={styles.fieldError}
                                                    >
                                                        {errors.address}
                                                    </div>
                                                }
                                            </div>
                                        }
                                        </UniqueID>
                                    </div>
                                    <div className={styles.column50}>
                                        <UniqueID>
                                        {(id) =>
                                            <div className={styles.field}>
                                                <label htmlFor={id}>Город</label>
                                                <Field
                                                    id={id}
                                                    name="city"
                                                    component={TextInput}
                                                />
                                                {errors.city && touched.city &&
                                                    <div
                                                        className={styles.fieldError}
                                                    >
                                                        {errors.city}
                                                    </div>
                                                }
                                            </div>
                                        }
                                        </UniqueID>
                                    </div>
                                </div>
                                <UniqueID>
                                {(id) =>
                                    <div
                                        className={cn(
                                            styles.field,
                                            {[styles.hidden]: values.method !== DeliveryMethod.RUSSIA}
                                        )}
                                    >
                                        <label htmlFor={id}>Транспортная компания</label>
                                        <Field
                                            id={id}
                                            name="city"
                                            options={[['1', 'Пуп-перевозчик'], ['2', 'Морковь-сити'], ]}
                                            component={SelectInput}
                                        />
                                        {errors.city && touched.city &&
                                            <div
                                                className={styles.fieldError}
                                            >
                                                {errors.city}
                                            </div>
                                        }
                                    </div>
                                }
                                </UniqueID>
                            </div>
                            {status &&
                                <div className={styles.error}>
                                     {status}
                                </div>
                            }
                            <button
                                className={styles.buttonSubmit}
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