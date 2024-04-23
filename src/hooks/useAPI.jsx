import { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAPI = (path) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(BASE_URL + path)
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  return { data, loading };
};

export default useAPI;
