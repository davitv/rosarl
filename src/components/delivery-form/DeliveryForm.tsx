import * as React from 'react';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import cn from 'classnames';

import {
    Formik,
    Field,
    FormikErrors,
    FormikActions
} from 'formik';

import { isEmpty } from '../../utils/check';

import { IMAGES_PATH_URL } from '../../products/constants';

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
    carrier: string;
}

export interface Props {
    warehouseAddress: string;
    warehouseImageURL: string;
    onValidityChange: (isValid: boolean) => void;
    onSubmit: (values: FormValues) => Promise<void>;
}

export default class DeliveryForm extends React.Component<Props> {
    public render() {
        const {
            warehouseAddress,
            warehouseImageURL,
            onValidityChange,
        } = this.props;

        return (
            <div className={styles.className}>

                <Formik
                    initialValues={{
                        method: DeliveryMethod.MOSCOW,
                        full_name: '',
                        address: '',
                        city: '',
                        carrier: '',
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

                        if (values.method === DeliveryMethod.PICKUP) {
                            onValidityChange(true);
                            return err;
                        }

                        if (!values.full_name) {
                            err.full_name = 'Введите имя';
                        }

                        if (!values.phone) {
                            err.phone = 'Введите номер телефона';
                        }

                        if (!values.address) {
                            err.address = 'Введите адрес';
                        }

                        if (!values.city) {
                            err.city = 'Введите город';
                        }

                        onValidityChange(isEmpty(err));

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
                        isValid,
                        values,
                        validateForm,
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
                                    styles.formFieldsWrapper,
                                    {[styles.hidden]: values.method === DeliveryMethod.PICKUP}
                                )}
                            >
                                <div className={styles.row}>
                                    <div className={styles.column50}>
                                        <UniqueID>
                                        {(id) =>
                                            <div
                                                className={cn(
                                                    styles.field,
                                                    {[styles.hasError]: errors.full_name && touched.full_name}
                                                )}
                                            >
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
                                            <div
                                                className={cn(
                                                    styles.field,
                                                    {[styles.hasError]: errors.phone && touched.phone}
                                                )}
                                            >
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
                                            <div
                                                className={cn(
                                                    styles.field,
                                                    {[styles.hasError]: errors.address && touched.address}
                                                )}
                                            >
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
                                            <div
                                                className={cn(
                                                    styles.field,
                                                    {[styles.hasError]: errors.city && touched.city}
                                                )}
                                            >
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
                                            {
                                                [styles.hidden]: values.method !== DeliveryMethod.RUSSIA,
                                                [styles.hasError]: errors.carrier && touched.carrier
                                            }
                                        )}
                                    >
                                        <label htmlFor={id}>Транспортная компания</label>
                                        <Field
                                            id={id}
                                            name="carrier"
                                            placeholder="Выберите транспортную компанию"
                                            options={[ ['1', 'Пуп-перевозчик'], ['2', 'Морковь-сити'], ]}
                                            component={SelectInput}
                                        />
                                        {errors.carrier && touched.carrier &&
                                            <div
                                                className={styles.fieldError}
                                            >
                                                {errors.carrier}
                                            </div>
                                        }
                                    </div>
                                }
                                </UniqueID>
                            </div>
                            <div
                                className={cn(
                                    {[styles.hidden]: values.method !== DeliveryMethod.PICKUP}
                                )}
                            >
                                <p>{warehouseAddress}</p>
                                <p><img src={IMAGES_PATH_URL + warehouseImageURL} /></p>
                            </div>
                            {status &&
                                <div className={styles.error}>
                                     {status}
                                </div>
                            }
                            <button
                                className={styles.buttonSubmit}
                                type="submit"
                                disabled={isSubmitting || !isValid}
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