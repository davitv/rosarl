import * as types from './types';

export const deliveryDataValidator = (values: Partial<types.DeliveryData>) => {
    const err: Partial<types.DeliveryData> = {};

    if (values.method === types.DeliveryMethod.PICKUP) {
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

    if (values.method === types.DeliveryMethod.RUSSIA) {
        if (!values.carrier) {
            err.carrier = 'Выберите перевозчика';
        }
    }

    return err;
}