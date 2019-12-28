import {getStatisticInfo} from '@/services/api';

export default {
    namespace: 'stat',

    state: {
        data: {},
        loading: false,
    },

    effects: {
        * fetchStatisticInfo({payload, callback}, {call, put}) {

            const name = payload.name

            const res = yield call(getStatisticInfo, name);

            yield put({
                type: "save",
                payload: {
                    data: res
                }
            })
            if (callback) callback();
        },

    },

    reducers: {
        save(state, {payload}) {
            return {
                ...state,
                ...payload,
            };
        },
        clear() {
            return {
                data: {}
            };
        },
    },
};
