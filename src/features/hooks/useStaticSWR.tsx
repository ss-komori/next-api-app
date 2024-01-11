import useSWR from "swr";

async function fetcher(key: string, init?: RequestInit) {
  return fetch(key, init).then((res) => res.json());
}

export const useStaticSWR = <T,>(key: string) => {
  const { data, mutate } = useSWR<T>(key, fetcher);

  return { data, mutate };
};
