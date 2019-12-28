import request from '@/utils/request';


const SERVER_URI = 'localhost:8080/api/v1/';

export async function getQuery(params) {

    console.log(params);
    return request(SERVER_URI + 'hotel/query/', {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}


export async function register(params) {
    //console.log(params);
    return request(SERVER_URI + 'rest-auth/registration/', {
        method: 'POST',
        body: params,
    })

}

export async function login(params) {
    return request(SERVER_URI + 'rest-auth/login/', {
        method: 'POST',
        body: params
    })
}

export async function logout() {
    return request(SERVER_URI + 'rest-auth/logout/', {})
}

export async function get_brands_by_city(city) {
    return request(SERVER_URI + 'hotel/brands/' + city)

}

export async function get_zones_by_city(city) {
    return request(SERVER_URI + 'hotel/zones/' + city)
}

export async function getBasicMetrics(params) {
    return request(SERVER_URI + 'hotel/dashboard/basicMetrics/', {
        method: 'POST',
        body: params
    })

}

export async function getHotelAnalysis(params) {
    return request(SERVER_URI + 'hotel/dashboard/hotelAnalysis/', {
        method: 'POST',
        body: params
    })

}


export async function getStatisticInfo(name) {
    return request(SERVER_URI  + 'statistics/info/' + name)
}


/**
 * this is just for mock
 * @param city
 * @returns {Promise<Array>}
//  */
// export async function getDistData(city) {
//     const salesData = [];
//     for (let i = 0; i < 12; i += 1) {
//         salesData.push({
//             x: `${i + 1}月`,
//             y: Math.floor(Math.random() * 1000) + 200,
//         });
//     }
//     return salesData;
// }



