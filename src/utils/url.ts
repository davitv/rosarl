
export const serialize = (dict?: {[key: string]: string | undefined}) => {
    if (dict === undefined) {
        return '';
    }

    const str = [];
    for (const k in dict){
        if (dict.hasOwnProperty(k) && dict[k] !== undefined) {
            str.push(encodeURIComponent(k) + "=" + encodeURIComponent(dict[k] as string));
        }
    }
    return str.join("&");
}