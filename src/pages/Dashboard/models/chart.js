import {getBasicMetrics, getDistData, getHotelAnalysis} from '@/services/api';

export default {
    namespace: 'chart',

    state: {
        basicData: {},
        distData: [],
        chartData: [],
        loading: false,
    },

    effects: {
        * fetchBasicMetrics({payload, callback}, {call, put}) {

            const res = yield call(getBasicMetrics, payload);
            // const res = {
            //     'totel_hotel_num': 0,
            //     'totel_room_num': 0,
            //
            //
            //     'adr': 0,
            //     'vacancy': 0,
            //
            //     'yoy': 0,
            //     'chain': 0,
            //
            //     'yoy_hotel_num': 0,
            //     'yoy_room_num': 0,
            // }
            yield put({
                type: "save",
                payload: {
                    basicData: res
                }
            })
            if (callback) callback();
        },


        * fetchHotelAnalysis({payload, callback}, {call, put}) {

            //todo: decide to call a specific api

            const res = yield call(getHotelAnalysis, payload);

            console.log("***")


            console.log(payload)
            console.log(res)
            yield put({
                type: 'save',
                payload: {
                    chartData: res
                }
            })
            if (callback) callback();
        },

        // * fetchHotelPriceByStar({payload, callback}, {call, put}) {
        //
        // },
        //
        // * fetchHotelAdrByHotel({payload, callback}, {call, put}) {
        //
        // },
        //
        //
        // * fetchHotelRoomNumByHotel({payload, callback}, {call, put}) {
        //
        // },





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
                distData: [],
                basicData: {}
                // visitData: [],
                // visitData2: [],
                // salesData: [],
                // searchData: [],
                // offlineData: [],
                // offlineChartData: [],
                // salesTypeData: [],
                // salesTypeDataOnline: [],
                // salesTypeDataOffline: [],
                // radarData: [],
            };
        },
    },
};
