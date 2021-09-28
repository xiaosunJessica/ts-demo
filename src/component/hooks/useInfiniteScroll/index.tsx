import { useState, useRef, useEffect, useCallback } from "react";
const useInfiniteLoading = (props: {
  getItems: ({ page }: { page: number | string }) => {
    totalPages: number;
    data: any[];
  };
}) => {
  // 获取数据
  const { getItems } = props;
  //数据列表
  const [items, setItems] = useState<any[]>([]);
  // 分页
  const pageToLoad = useRef(
    new URLSearchParams(window.location.search).get("page") || 1
  );

  const initialPage = useRef(
    new URLSearchParams(window.location.search).get("page") || 1
  );

  const lowestPageLoaded = useRef(initialPage.current);
  const highestPageLoaded = useRef(initialPage.current);

  // 是否初次加载
  const initialPageLoaded = useRef(false);
  // 是否还有更多
  const [hasNext, setHasNext] = useState(true);

  // 回退
  const [hasPrevious, setHasPrevious] = useState(
    () => pageToLoad.current !== 1
  );

  const loadItems = useCallback(
    async (page, itemCombiteMethod) => {
      /* 3 */
      const data = await getItems({
        page,
      });
      setHasNext(data.totalPages > page);
      setHasPrevious(page > 1);
      setItems((prevItems) => {
        return itemCombiteMethod === "prepend"
          ? [...data.data, ...prevItems]
          : [...prevItems, ...data.data];
      });
    },
    [getItems]
  );

  const loadNext = () => {
    const nextPage = Number(highestPageLoaded.current) + 1;
    loadItems(nextPage, "append");
    highestPageLoaded.current = nextPage;
  };

  const loadPrevious = () => {
    const nextPage = Number(lowestPageLoaded.current) + 1;
    if (nextPage < 1) return;
    loadItems(pageToLoad.current, "prepend");
    lowestPageLoaded.current = nextPage;
  };

  useEffect(() => {
    if (initialPageLoaded.current) {
      return;
    }

    loadItems(pageToLoad.current, "append");
    initialPageLoaded.current = true;
  }, [loadItems]);

  return {
    items,
    hasNext,
    hasPrevious,
    loadNext,
    loadPrevious,
  };
};

export default useInfiniteLoading;
