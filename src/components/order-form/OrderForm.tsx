import * as React from 'react';
import cn from 'classnames';

import { Formik, Field, FormikErrors, FormikTouched, FormikActions } from 'formik';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import { IMAGES_PATH_URL } from '../../products/constants';

import TextInput from '../text-input';
import SelectInput from '../select-input';
import UniqueID from '../unique-id';


const styles = require('./OrderForm.css');


export enum DeliveryMethod {
    MOSCOW = 0,
    RUSSIA,
    PICKUP
}

export interface FormValues {
    business_type: string;
    organization_name: string;
    phone: string;
    email: string;

    inn: string;
    kpp: string;
    bik: string;
    korn: string;
    rsn: string;

    first_name: string;
    last_name: string;
    patronymic: string;
    legal_address: string;
    address: string;
    city: string;
    postal_code: string;

    bank_name: string;
}

export interface Props {
    warehouseAddress: string;
    warehouseImageURL: string;
    onSubmit: (values: FormValues) => Promise<void>;
}


const renderInputTextField = (
    name: string,
    label: string,
    errors: FormikErrors<Partial<FormValues>>,
    touched: FormikTouched<Partial<FormValues>>) => (
    <UniqueID>
    {(id) =>
        <div
            className={cn(
                styles.field,
                {[styles.hasError]: errors.organization_name && touched.organization_name}
            )}
        >
            <label htmlFor={id}>{label}</label>
            <Field
                id={id}
                name={name}
                component={TextInput}
            />
            {errors[name] && touched[name] &&
                <div
                    className={styles.fieldError}
                >
                    {errors[name]}
                </div>
            }
        </div>
    }
    </UniqueID>
)

export default class OrderForm extends React.Component<Props> {
    public render() {
        const {
            warehouseAddress,
            warehouseImageURL,
        } = this.props;

        return (
            <div className={styles.className}>

                <Formik
                    initialValues={{
                        business_type: 'legal',
                        organization_name: '',
                        email: '',

                        kpp: '',
                        rsn: '',
                        inn: '',
                        bik: '',
                        korn: '',
                        phone: '',

                        bank_name: '',


                        first_name: '',
                        last_name: '',
                        patronymic: '',

                        legal_address: '',
                        address: '',
                        city: '',
                        postal_code: '',

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
                        isValid,
                        values,
                    }) =>
                        <form
                            onSubmit={handleSubmit}
                            className={styles.form}
                        >
                            <div className={styles.businessTypeChoices}>
                                <span className={styles.businessTypeLabel}>К какой категории вы относитесь:</span>
                                <UniqueID>
                                {(id) =>
                                    <div
                                        className={cn(
                                            styles.field,
                                            styles.fieldRadio,
                                            {[styles.hasError]: errors.business_type && touched.business_type}
                                        )}
                                    >
                                        <Field
                                            id={id}
                                            name="business_type"
                                            value="individual"
                                            type="radio"
                                        />
                                        <label htmlFor={id}>Физ. лицо</label>
                                        {errors.business_type && touched.business_type &&
                                            <div
                                                className={styles.fieldError}
                                            >
                                                {errors.business_type}
                                            </div>
                                        }
                                    </div>
                                }
                                </UniqueID>
                                <UniqueID>
                                {(id) =>
                                    <div
                                        className={cn(
                                            styles.field,
                                            styles.fieldRadio,
                                            {[styles.hasError]: errors.business_type && touched.business_type}
                                        )}
                                    >
                                        <Field
                                            id={id}
                                            name="business_type"
                                            value="legal"
                                            type="radio"
                                        />
                                        <label htmlFor={id}>Юр. лицо</label>
                                        {errors.business_type && touched.business_type &&
                                            <div
                                                className={styles.fieldError}
                                            >
                                                {errors.business_type}
                                            </div>
                                        }
                                    </div>
                                }
                                </UniqueID>
                                <UniqueID>
                                {(id) =>
                                    <div
                                        className={cn(
                                            styles.field,
                                            styles.fieldRadio,
                                            {[styles.hasError]: errors.business_type && touched.business_type}
                                        )}
                                    >
                                        <Field
                                            id={id}
                                            name="business_type"
                                            value="retailer"
                                            type="radio"
                                        />
                                        <label htmlFor={id}>ИП</label>
                                        {errors.business_type && touched.business_type &&
                                            <div
                                                className={styles.fieldError}
                                            >
                                                {errors.business_type}
                                            </div>
                                        }
                                    </div>
                                }
                                </UniqueID>
                            </div>
                            <div
                                className={cn(
                                    styles.formFieldsWrapper,
                                )}
                            >
                                <div className={styles.row}>
                                    <div className={styles.column50}>
                                        {renderInputTextField('organization_name', 'Название организации', errors, touched)}
                                    </div>
                                    <div className={styles.column25}>
                                        {renderInputTextField('email', 'Эл. почта', errors, touched)}
                                    </div>
                                    <div className={styles.column25}>
                                        {renderInputTextField('phone', 'Телефон', errors, touched)}
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.column20}>
                                        {renderInputTextField('rsn', 'Р/с N', errors, touched)}
                                    </div>
                                    <div className={styles.column20}>
                                        {renderInputTextField('korn', 'Кор/с N', errors, touched)}
                                    </div>
                                    <div className={styles.column20}>
                                        {renderInputTextField('bik', 'БИК', errors, touched)}
                                    </div>
                                    <div className={styles.column20}>
                                        {renderInputTextField('inn', 'ИНН', errors, touched)}
                                    </div>
                                    <div className={styles.column20}>
                                        {renderInputTextField('kpp', 'КПП', errors, touched)}
                                    </div>
                                </div>

                                {renderInputTextField('bank_name', 'Название банка', errors, touched)}

                                <div className={styles.row}>
                                    <div className={styles.column33}>
                                        {renderInputTextField('first_name', 'Имя', errors, touched)}
                                    </div>
                                    <div className={styles.column33}>
                                        {renderInputTextField('last_name', 'Фамилия', errors, touched)}
                                    </div>
                                    <div className={styles.column33}>
                                        {renderInputTextField('patronymic', 'Отчество', errors, touched)}
                                    </div>
                                </div>

                                 <div className={styles.row}>
                                    <div className={styles.column50}>
                                        {renderInputTextField('legal_address', 'Юридический адрес', errors, touched)}
                                    </div>
                                    <div className={styles.column50}>
                                        {renderInputTextField('address', 'Почтовый адрес', errors, touched)}
                                    </div>
                                </div>
                                 <div className={styles.row}>
                                    <div className={styles.column50}>
                                        {renderInputTextField('city', 'Город', errors, touched)}
                                    </div>
                                    <div className={styles.column50}>
                                        {renderInputTextField('postal_code', 'Индекс', errors, touched)}
                                    </div>
                                </div>
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