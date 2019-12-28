import { register } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload, callback}, { call, put }) {

      const response = yield call(register, payload);

      console.log(response)


      let res = {}
      if (response.token && response.user) {
        res.status = 'ok';
        res.currentAuthority = 'user';
        res.errMessage = '';
      } else {
        res.errMessage = response;
        res.status = 'error';
        res.currentAuthority = 'guest';
      }

      yield put({ type: 'registerHandle', payload: res});
      if (callback) callback();
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
        errMessage: payload.errMessage,
      };
    },
  },
};
