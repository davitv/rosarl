
// copied from is_js lib (https://github.com/arasatasaygin/is.js)
export const isObject = <T>(value: T): boolean => Object(value) === value

// copied from is_js lib (https://github.com/arasatasaygin/is.js)
export const isArray = Array.isArray || ((value) => {    // check native isArray first
    return toString.call(value) === '[object Array]';
});

// copied from is_js lib (https://github.com/arasatasaygin/is.js)
export const isArguments = <T>(value: T) =>
     toString.call(value) === '[object Arguments]' // fallback check is for IE
     ||
     (value != null && typeof value === 'object' && 'callee' in value);


// copied from is_js lib (https://github.com/arasatasaygin/is.js)
export const isEmpty = <T>(value: T) => {
    if (isObject(value)) {
        const length = Object.getOwnPropertyNames(value).length;
        if (length === 0 || (length === 1 && isArray(value)) ||
                (length === 2 && isArguments(value))) {
            return true;
        }
        return false;
    }

    if (typeof value === 'string') {
        return value === '';
    }
    return false;
}