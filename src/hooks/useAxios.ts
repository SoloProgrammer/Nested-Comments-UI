import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

type OptionsType = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: Object;
  headers?: Object;
};

export const useAxios = <T>(
  url: string,
  options: OptionsType,
  dependencies: any[]
) => {
  const { execute, ...state } = useAxiosInternal<T>(
    url,
    options,
    dependencies,
    true
  );
  useEffect(() => {
    execute();
  }, [execute]);

  return state;
};

export const useAxiosFn = <T>(
  url: string,
  options: OptionsType,
  dependencies: any[] = []
) => {
  return useAxiosInternal<T>(url, options, dependencies, false);
};

const useAxiosInternal = <T>(
  url: string,
  options: Object,
  dependencies: any[],
  initialLoading: true | false
) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<null | string>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios(url, options);
      setData(data);
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  }, dependencies);
  return { data, loading, error, execute };
};
