import axios from 'axios';
import { createTransform } from './utils/utils';

const snakeCase = require('lodash/snakeCase');
const camelCase = require('lodash/camelCase');

const deepSnake = createTransform(snakeCase);
const deepCamel = createTransform(camelCase);

const transformKeysToSnakeCase = config => {
    if (config.data) {
        config.data = deepSnake(config.data);
    }
    if (config.params) {
        config.params = deepSnake(config.params);
    }
    return config;
}

const transformKeysToCamelCase = config => {
    if (config.data) {
        config.data = deepCamel(config.data);
    }
    if (config.params) {
        config.params = deepCamel(config.params);
    }
    return config;
}

axios.interceptors.request.use(transformKeysToSnakeCase);
axios.interceptors.request.use(transformKeysToCamelCase);
