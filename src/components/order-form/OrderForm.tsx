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
                {[styles.hasError]: errors[name] && touched[name]}
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
                        business_type: 'individual',
                        organization_name: 'aaa',
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
                    isInitialValid={true}
                    onSubmit={(values: FormValues, actions: FormikActions<FormValues>) => {
                        actions.setSubmitting(true);
                        return this.props.onSubmit(values).catch(err => {
                            console.log('ERRORS', err);

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
                        isValid,
                        values,
                    }) => {
                        const renderField = (name: string, label: string) => renderInputTextField(name, label, errors, touched);

                        return (
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
                                            {renderField('organization_name', 'Название организации')}
                                        </div>
                                        <div className={styles.column25}>
                                            {renderField('email', 'Эл. почта')}
                                        </div>
                                        <div className={styles.column25}>
                                            {renderField('phone', 'Телефон')}
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.column20}>
                                            {renderField('rsn', 'Р/с N')}
                                        </div>
                                        <div className={styles.column20}>
                                            {renderField('korn', 'Кор/с N')}
                                        </div>
                                        <div className={styles.column20}>
                                            {renderField('bik', 'БИК')}
                                        </div>
                                        <div className={styles.column20}>
                                            {renderField('inn', 'ИНН')}
                                        </div>
                                        <div className={styles.column20}>
                                            {renderField('kpp', 'КПП')}
                                        </div>
                                    </div>

                                    {renderField('bank_name', 'Название банка')}

                                    <div className={styles.row}>
                                        <div className={styles.column33}>
                                            {renderField('first_name', 'Имя')}
                                        </div>
                                        <div className={styles.column33}>
                                            {renderField('last_name', 'Фамилия')}
                                        </div>
                                        <div className={styles.column33}>
                                            {renderField('patronymic', 'Отчество')}
                                        </div>
                                    </div>

                                     <div className={styles.row}>
                                        <div className={styles.column50}>
                                            {renderField('legal_address', 'Юридический адрес')}
                                        </div>
                                        <div className={styles.column50}>
                                            {renderField('address', 'Почтовый адрес')}
                                        </div>
                                    </div>
                                     <div className={styles.row}>
                                        <div className={styles.column50}>
                                            {renderField('city', 'Город')}
                                        </div>
                                        <div className={styles.column50}>
                                            {renderField('postal_code', 'Индекс')}
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
                                    disabled={!isValid}
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
                        )
                    }}
                </Formik>
            </div>
        );
    }
}