import {
    getQuery,
    get_brands_by_city,
    get_zones_by_city
} from '@/services/api'

export default {
  namespace: 'query',
  state: {
    tableData : {}
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchData({payload, callback}, { put, call }){
      // console.log(payload);
      const response = yield call(getQuery, payload);
      yield put({ type: 'save', payload: {tableData: response} });


      if (callback) callback();
    },
    *fetchBrandsByCity({payload, callback}, {put, call}) {
      const {city} = payload
      const res = yield call(get_brands_by_city, city)

      yield put({
        type: 'save',
        payload: {
          brands: res
        }
      });
      if (callback) callback();
    },
    *fetchZonesByCity({payload, callback}, {put, call}) {
      const {city} = payload
      const res = yield call(get_zones_by_city, city)
      yield put({
        type: 'save',
        payload: {
          zones: res
        }
      });
      if (callback) callback();
    }
  },
}
