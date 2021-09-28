import React from "react";

import useInfiniteLoading from "../../component/hooks/useInfiniteScroll";

const InfiniteScroll = () => {
  const getItems: ({ page }: { page: number | string }) => {
    totalPages: number;
    data: any[];
  } = ({ page }) => {
    console.log(page);
    return {
      totalPages: 1,
      data: [],
    };
  };

  const { items, hasNext, hasPrevious, loadNext, loadPrevious } =
    useInfiniteLoading({
      getItems,
    });

  return (
    <div>
      {hasPrevious && (
        <button onClick={() => loadPrevious()}>Load Previous</button>
      )}
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {hasNext && <button onClick={() => loadNext()}>Load More</button>}
    </div>
  );
};

export default InfiniteScroll;
