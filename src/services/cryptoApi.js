import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '84cc95c7a0msh7489af14c60e5c6p176712jsn6d3bddd7ffe9'
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url:url, headers:cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl:baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createRequest('/coins')
        })
    })
});

export const {
    useGetCryptosQuery,
} = cryptoApi;

// var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://coinranking1.p.rapidapi.com/stats',
//   headers: {

//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });