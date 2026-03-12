import { useCallback, useSyncExternalStore } from "react";

const getMediaQueryList = (query: string): MediaQueryList | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.matchMedia(query);
};

export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQueryList = getMediaQueryList(query);

      if (!mediaQueryList) {
        return () => undefined;
      }

      mediaQueryList.addEventListener("change", onStoreChange);

      return () => {
        mediaQueryList.removeEventListener("change", onStoreChange);
      };
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    return getMediaQueryList(query)?.matches ?? false;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
};
