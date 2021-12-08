import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
     'x-bingapis-sdk': 'true',
     'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
     'x-rapidapi-key': '84cc95c7a0msh7489af14c60e5c6p176712jsn6d3bddd7ffe9'
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({url:url, headers:cryptoNewsApiHeaders})

export const cryptoNewsApi = createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl:baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory,count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
});

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;
