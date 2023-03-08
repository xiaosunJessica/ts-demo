import React, { useState, useRef } from "react";
import styles from './index.module.less';
const clientHeight = document.body.clientHeight;
interface ScrollCmptProps {
  isScroll?: boolean;
  maxHeight?: number;
  height?: string;
  children: React.ReactNode;
  onScrollData: () => void;
  styles?: any
}
const ScrollCmpt = (props: ScrollCmptProps) => {
  const {
    isScroll,
    maxHeight,
    height,
    ...other
  } = props;
  // 滚动容器
  const scrollContainerRef: any = useRef<HTMLDivElement>();
  // useMemo/useCallback
  const onScrollEvent = () => {
    // tableData不超过总数，超过就不发起请求
    if (isScroll !== undefined && !isScroll) return;
    if (scrollContainerRef.current.scrollHeight - (scrollContainerRef.current.scrollTop + scrollContainerRef.current.clientHeight) === 0
      // scrollContainerRef.current.scrollHeight
    ) {
      // 这里去做你的异步数据加载
      props.onScrollData();
    }
  };
  return (
    <div
      onScrollCapture={e => {
        e.stopPropagation();
        e.preventDefault();
        onScrollEvent();
      }}
      className={styles.scrollCmpt}
      style={{
        maxHeight: `${maxHeight || clientHeight/100}rem`,
        // height: height ? height : "auto",
        ...props.styles
      }}
      ref={scrollContainerRef}
    >
      {props.children}
      {/* {
      hasMore && (
        <div className={styles.noMore}>暂无更多{noMoreText}记录</div>
      )} */}
    </div>
  );
};

export default ScrollCmpt;
