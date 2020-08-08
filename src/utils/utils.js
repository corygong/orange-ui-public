const reduce = require('lodash/reduce');


function createTransform(transformKey) {
    function transformObject(value, depth = -1) {
        if (depth === 0 || value == null || typeof value !== 'object' ) {
            return value;
        }
        if (Array.isArray(value)) {
            return value.map(item => transformObject(item, depth-1))
        }
        return reduce( value, (prev, val, key) => {
            prev[transformKey[key]] = transformObject(val, depth -1);
            return prev;
        }, {})

    }
    return transformObject;
}

export { createTransform }