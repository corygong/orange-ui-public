import axios from 'axios';
import {merge} from 'lodash';

import '../axiosSetting'

const request = async (_options) => {

    const method = _options.method || 'GET';
    const options = merge(
        {...options},
        {method}
    )

    return axios(options);
}



const put = ( url, params, _options) => {
    return request({ ..._options, params, url, method: 'PUT' });
}

const get = ( url, params, _options) => {
    return request({ ..._options, params, url });
}

const post = ( url, params, _options) => {
    return request({ ..._options, params, url, method: 'POST' });
}

export { get, post, put };

export default request;