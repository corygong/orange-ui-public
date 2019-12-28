import {routerRedux} from 'dva/router';
import {stringify} from 'qs';
import {login} from '@/services/api';
import {getPageQuery} from '@/utils/utils';
import {reloadAuthorized} from '@/utils/Authorized';
import {setAuthority} from '@/utils/authority';

import cookie from 'react-cookie';

export default {
    namespace: 'login',

    state: {
        status: undefined,
    },

    effects: {
        * login({payload}, {call, put}) {
            const res = yield call(login, payload);

            console.log(res)

            yield put({
                type: 'save',
                payload: res
            })

            if (res['token'] && res['user']) {
                cookie.save('username', res['user']['email'], {
                    path: '/',
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                })

                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let {redirect} = params;
                if (redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if (redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf('#') + 1);
                        }
                    } else {
                        window.location.href = redirect;
                        return;
                    }
                }
                yield put(routerRedux.replace(redirect || '/'));
            }
        },

        // *getCaptcha({ payload }, { call }) {
        //   yield call(getFakeCaptcha, payload);
        // },

        * logout(_, {put}) {




            cookie.remove('username', {path: '/'})

            yield put(
                routerRedux.push({
                    pathname: '/user/login',
                    search: stringify({
                        redirect: window.location.href,
                    }),
                })
            );
        },
    },

    reducers: {
        save(state, {payload}) {
            return {
                ...state,
                ...payload
            };
        }
    },
};
