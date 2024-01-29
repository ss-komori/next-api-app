import { useEffect } from "react";
import useSWR from "swr";

async function fetcher(key: string, init?: RequestInit) {
  return fetch(key, init).then((res) => res.json());
}

export const useStaticSWR = <T,>(key: string, initialData: T) => {
  const { data = initialData, mutate } = useSWR<T>(key, fetcher, {
    fallbackData: initialData,
  });

  useEffect(() => {
    // swrでキャッシュされているdataがundefinedだった場合に、initialDataをset
    mutate((_data) => _data || initialData, false);
  }, []);

  return { data, mutate };
};
