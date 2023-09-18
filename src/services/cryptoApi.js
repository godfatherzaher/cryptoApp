import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeader = {
    'X-RapidAPI-Key': 'a526f0f4a1msh9cb853467e8e51bp1a4786jsne36eabbce84c',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'

}

const baseUrl = 'https://coinranking1.p.rapidapi.com'


const createRequest = (url) => ({url, headers :cryptoApiHeader})

export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder) => ({
        getCryptos:builder.query({
            query:(count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query:(uuid)=> createRequest(`/coin/${uuid}`)
        }),
    })
    
})

export const { useGetCryptosQuery,useGetCryptoDetailsQuery} =  cryptoApi;
