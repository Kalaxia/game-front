export const formatData = (data, prefix) => {
    let result = {};

    for (const k in data) {
        const key = (typeof prefix !== 'undefined') ? `${prefix}__${k}` : k;
        if (typeof data[k] === 'object') {
            result = Object.assign({}, result, formatData(data[k], key));
        }
        result[key] = data[k];
    }
    return result;
};