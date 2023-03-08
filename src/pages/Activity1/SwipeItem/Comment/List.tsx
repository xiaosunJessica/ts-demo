/*
 * @Author: your name
 * @Date: 2021-02-25 10:42:35
 * @LastEditTime: 2021-03-01 15:45:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mcg-circle-fe/client/src/pages/Activity1/SwipeItem/Comment/List.tsx
 */
import React, { useCallback } from 'react';
import Item from './Item';
import styles from './index.module.less';
import { CommentItemType, CommentResultType } from './index';
const List = React.memo((props: {
  listData: CommentResultType;
  getReplyList: (params: any) => void;
}) => {
  const getReplyList = useCallback((params) => {
    props.getReplyList(params)
  }, [props])
 
  return (
    <div className={styles.list}>
      {
        props.listData?.pageList?.map((list: CommentItemType, idx) => {
         return (
          <Item 
            itemData={list} 
            itemKey={idx}
            key={list.id}
            cls={styles.mainComment}>
            {
              !!list?.childrenList?.length && list?.childrenList?.map((child: CommentItemType, subIdx: number) => {
                return <Item smAvatar={true} key={child.id} itemData={child} itemKey={idx} subItemKey={subIdx} />   
              })
            }
            {
              (list?.replyNum || 0) > (list?.childrenList?.length || 0) && (
                <div className={styles.more} onClick={() => getReplyList({
                  ...list,
                  itemKey: idx,
                })}>
                  —— 展开10条回复
                </div>
              )
            }
          </Item>
         )
        })
      }
     
    </div>
  )
})

export default List;