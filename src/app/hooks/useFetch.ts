import { useState, useEffect } from 'react';

interface UseFetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

interface UseFetchOptions {
    autoFetch?: boolean;
}

export function useFetch<T>(url: string, options: UseFetchOptions = { autoFetch: true }) {
    const [state, setState] = useState<UseFetchState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const fetchData = async (fetchUrl = url) => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const response = await fetch(fetchUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setState({ data, loading: false, error: null });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setState({ data: null, loading: false, error: errorMessage });
        }
    };

    const refetch = () => fetchData();

    const fetchWithError = () => fetchData('https://jsonplaceholder.typicode.com/invalid-endpoint');

    useEffect(() => {
        if (options.autoFetch && url) {
            fetchData();
        }
    }, [url, options.autoFetch]);

    return {
        ...state,
        refetch,
        fetchWithError,
    };
}