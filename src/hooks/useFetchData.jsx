import { useEffect, useState } from 'react';

/**
 * @name useFetchData
 * @description This hook requests data from the url parameter endpoint.
 * @param {*} url The http endpoint to fetch from.
 * @returns JSON object containing the response from the fetch request.
 */
export const useFetchData = (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (url) => {

            setLoading(true);

            await fetch(url, {mode: 'cors'})
                .then(response => response.json())
                .then(responseJson => setData(responseJson))

            setLoading(false);
        }
        fetchData(url)
    }, [url])

    return { data, loading };
}