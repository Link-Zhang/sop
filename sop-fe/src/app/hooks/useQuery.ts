"use client";

import useSWR, { type SWRConfiguration } from "swr";

export default function useQuery<T>(
  key: string | null,
  fetcher: (url: string) => Promise<T>,
  option?: SWRConfiguration,
) {
  return useSWR<T>(key, fetcher, {
    onErrorRetry(err, _k, _c, revalidate, { retryCount }) {
      if ((err?.status >= 400 && err?.status < 500) || retryCount > 3) return;
      setTimeout(() => revalidate({ retryCount }), 2 ** retryCount * 1000);
    },
    ...option,
  });
}
