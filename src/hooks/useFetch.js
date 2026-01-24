import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
  // This state will store the data we get from the API
  const [data, setData] = useState(null);

  // This state is used to show loading message while data is being fetched
  const [loading, setLoading] = useState(false);

  // This state will store any error that occurs during fetching
  const [error, setError] = useState(null);

  // This function is used to fetch data from the given API URL
  // useCallback is used so the function is not recreated again and again
  const fetchData = useCallback(async () => {
    // If URL is empty or not provided, stop execution
    if (!url) return;

    // Start loading and clear previous errors
    setLoading(true);
    setError(null);

    try {
      // Call the API using fetch
      const response = await fetch(url);

      // If response is not successful, throw an error
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Convert the response into JSON format
      const result = await response.json();

      // Save the fetched data into state
      setData(result);
    } catch (err) {
      // If any error occurs, store the error message
      setError(err.message);
    } finally {
      // Stop loading once the fetch process is complete
      setLoading(false);
    }
  }, [url]);

  // useEffect runs when the component loads or when the URL changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Return data, loading and error so they can be used in components
  return { data, loading, error };
};

export default useFetch;