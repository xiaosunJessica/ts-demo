import { useRef } from "react";

function useRequest(service: any, options: any = {}) {
  const finalOptions = { ...options };
  const { paginated, loadMore, requestMethod } = finalOptions;

  const paginatedRef = useRef(paginated);
  const loadMoreRef = useRef(loadMore);

  paginatedRef.current = paginated;
  loadMoreRef.current = loadMore;
  const fetchProxy = (...args: any[]) => {
    //@ts-ignore
    fetch(...args).then((res: Response) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    });
  };

  const finalRequestMethod = requestMethod || fetchProxy;

  let promiseService: () => Promise<any>;

  switch (typeof service) {
    case "string":
      promiseService = () => finalRequestMethod(service);
      break;
    case "object":
      const { url, ...rest } = service;
      promiseService = () =>
        requestMethod ? requestMethod(service) : fetchProxy(url, rest);
      break;
    default:
      promiseService = (...args: any[]) =>
        new Promise((resolve, reject) => {
          const s = service(...args);
          let fn = s;
          if (!s.then) {
            switch (typeof s) {
              case "string":
                fn = finalRequestMethod(s);
                break;
              case "object":
                const { url, ...rest } = s;
                fn = requestMethod ? requestMethod(s) : fetchProxy(url, rest);
                break;
            }
          }
          fn.then(resolve).catch(reject);
        });
  }
}

export { useRequest };
