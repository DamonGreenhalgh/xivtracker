import { useEffect, useState } from "react";

/**
 * @name useFetchData
 * @description This hook requests data from the url parameter endpoint.
 * @param {*} url The http endpoint to fetch from.
 * @returns JSON object containing the response from the fetch request.
 */
export const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async (url) => {
      setLoading(true);
      await fetch(url, { mode: "cors", signal: signal })
        .then((response) => {
          setOk(response.ok);
          return response.json();
        })
        .then((responseJSON) => setData(responseJSON))
        .catch((error) => {});

      setLoading(false);
    };
    fetchData(url);

    return () => controller.abort();
  }, [url]);

  return { data, loading, ok };
};
