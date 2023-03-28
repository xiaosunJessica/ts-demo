/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import List from './List';
import TextareaCmpt, { Textarea } from './Textarea';
import { useComment } from '../hooks';
import ModalCmpt from '../../components/ModalCmpt';
import activity1Service from '../../service';
import { CommentInfoContext } from './context';
import { SwipeItemProps } from '../../index';
import styles from './index.module.less';
import { debounce } from 'lodash';
import ScrollCmpt from '../../components/ScrollCmpt';
export type CommentItemType = {
  id: number;
  appCode: 'cg-app';
  entityId: string;   
  content: string;	
  likes: number;	
  liked: number;
  hot: number;	
  commenter: string;
  commenterCode: number;
  extra: string;	
  createTime: number;
  updateTime: number;
  deleteFlag: number;
  replyNum: number;	
  childrenList: CommentItemType[];
  childrenNextPage: number;
  childrenTotalCount: number;
  childrenTotalPage: number;
  circleName: string;
  avatar: string;

}

export type CommentResultType = {
  totalCount: number;
  pageList: CommentItemType[];
  pageSize: number;
  pageNo: number
}

// type CommentItemCompType = {}

// type CommentResultCompType = {
//   totalCount: number;
//   pageList: CommentItemType[];
//   pageSize: number;
//   pageNo: number
// }

type CommentInfoType = {
  replyInfo: any|undefined; // 回复人信息
  commentVisible: boolean; // 活动评论展示与否
  itemKey?: number; // 操作的主评论index
}

// type CommentContextType = {
//   commentInfo: CommentInfoType,
//   setCommentInfo: Function;
// }

let requestFlag = false

const Comment = React.memo((props: {
  setShowComment: Function;
  activityId: number;
} & SwipeItemProps) => {

  const [loading, setLoading] = useState<Boolean>(false);
  // 评论结果
  const [commentResult, setCommentResult] = useState<CommentResultType>()
  // 控制是否展示评论
  const { onShowComment } = useComment(props);

  // 回复人信息
  const [ commentInfo, setCommentInfo] = useState<CommentInfoType>({
    replyInfo: undefined, 
    commentVisible: false,
    itemKey: undefined
  });

  const hideComment = () => {
    setCommentInfo({
      replyInfo: undefined, 
      commentVisible: false,
    })
  }
  
  const getCommentList = async ({
    pageNo
  }: any) => {
    // 有comment请求，暂时不发起
    if (requestFlag) return;
    requestFlag = true;
    setLoading(true);
    const res: {
      data: CommentResultType
    } = await activity1Service.getCommentList({
      activityId: props.activityId,
      circleId: props.circleId,
      pageNo
    })
    .catch(() => {
      setLoading(false);
      requestFlag = false;
    });
    if (Array.isArray(res?.data?.pageList)) {
      if (pageNo === 1) {
        // 直接替换评论列表
        setCommentResult(res.data);
      } else {
        // 拼接评论列表
        setCommentResult((params:CommentResultType) => ({
          ...params,
          pageList: params?.pageList?.concat(res.data.pageList) || []
        }))
      }
    }
    setLoading(false);
    requestFlag = false;
  }
  useEffect(() => {
    getCommentList({
      pageNo: 1
    })
  }, [props.activityId])

  // 评论提交，将主评论提交放在最前面
  const submitComment = async (params: any) => {
    const commentObj = {
      appCode: 'cg-app',
      entityId: props.id,
      // commenterCode: window.$userInfo.userCode,
      // commenter: window.$userInfo.displayName,
      module: props.circleId,
      idempotent: new Date().getTime(),
      ...params
    }
    if (commentInfo.replyInfo?.id) {
      // 回复评论
      if (commentInfo.itemKey !== undefined) {
        const res = await activity1Service.submitReplyComment({
          ...commentObj,
          commentId: commentInfo?.replyInfo?.hasOwnProperty('parentId') ? commentInfo.replyInfo.commentId :commentInfo.replyInfo.id,
          extra: JSON.stringify({
            commentCode: commentInfo.replyInfo.commenterCode,
            commentName: commentInfo.replyInfo.commenter,
          }),
          parentId: commentInfo?.replyInfo?.hasOwnProperty('parentId') ? commentInfo.replyInfo.id : null,
        }).catch((err) => {
          // Toast.info(err.message || '评论失败', 2)
          hideComment()
        })
        if (res?.message) {
          // Toast.info(res.message, 2)
          return 
        }
        if (res?.data) {
          const _pageList = JSON.parse(JSON.stringify(commentResult?.pageList));
          _pageList[commentInfo.itemKey].childrenList = [res.data].concat(_pageList[commentInfo.itemKey]?.childrenList || []);
          setCommentResult((params: CommentResultType) => ({
            ...params,
            pageList: _pageList
          }))
          hideComment()
        }
     
      }
    } else {
      // 主评论
      const res = await activity1Service.submitMainComment({
        ...commentObj,    
      }).catch((err) => {
        // Toast.info(err.message || '评论失败', 2)
        hideComment()
      })
      hideComment();
      if (res?.message) {
        // Toast.info(res.message, 2)
        return 
      }
      if (res?.data?.id) {
        setCommentResult((params:CommentResultType) => ({
          ...params,
          pageList: [res.data].concat(params?.pageList || []),
          totalCount: (commentResult?.totalCount || 0) + 1
        }))
      }
    }
   
  } 

  const onLiked = async (item: any) => {
    const pageList: any[] = JSON.parse(JSON.stringify(commentResult?.pageList)) || [];
    if (item.itemKey === undefined) return;
    const submitLike = debounce(async () => {
      // 主评论
      let like = item?.itemData.liked || 0;
      if (item.subItemKey !== undefined) {
        // 回复评论
        like = pageList[item.itemKey]?.childrenList[item.subItemKey].liked || 0
      }
      const res = await activity1Service.commentLike({
        activityId: props.id,
        circleId: props.circleId,
        relationId: item?.itemData?.id,
        liked: item?.itemData.liked ? 0 : 1,
        type: item.subItemKey !== undefined ? 1 : 0
      }).catch((err) => {
        if (err.message) {
          // Toast.info(err.message);
        }
      })
    }, 500)
    submitLike();
    if (item.subItemKey === undefined) {
      // 主评论
      if (pageList[item.itemKey || 0].liked) {
        // 取消点赞
        pageList[item.itemKey || 0].liked = 0;
        pageList[item.itemKey || 0].likes = pageList[item.itemKey || 0].likes - 1;
      } else {
        // 点赞
        pageList[item.itemKey || 0].liked = 1;
        pageList[item.itemKey || 0].likes = pageList[item.itemKey || 0].likes + 1;
      }
    } else {
      if (pageList[item.itemKey || 0].childrenList[item.subItemKey]?.liked) {
        // 取消点赞
        pageList[item.itemKey || 0].childrenList[item.subItemKey].liked = 0;
        pageList[item.itemKey || 0].childrenList[item.subItemKey].likes = pageList[item.itemKey || 0].childrenList[item.subItemKey].likes - 1;
      } else {
        // 点赞
        pageList[item.itemKey || 0].childrenList[item.subItemKey].liked = 1;
        pageList[item.itemKey || 0].childrenList[item.subItemKey].likes = pageList[item.itemKey || 0].childrenList[item.subItemKey].likes + 1;
      }
    }
    setCommentResult((params: CommentResultType) => ({...params, pageList}))
  }

  const onDeleteComment = useCallback(async (item: any) => {
    let _pageList = JSON.parse(JSON.stringify(commentResult?.pageList || []));
    // 删除主评论
    if (item.subItemKey === undefined && item.itemKey !== undefined) {
      const res = await activity1Service.deleteMainComment({
        id: item?.itemData?.id,
        activityId: props.id,
      }).catch(() => {})
      if (res.message === '成功') {
        const count = (commentResult?.totalCount || 0) - 1;
        _pageList.splice(item.itemKey, 1);
        setCommentResult((params: CommentResultType) => ({
          ...params,
          pageList: _pageList,
          totalCount: count < 0 ? 0 : count
        }))
      }
      if (res.message) {
        // Toast.info(res.message, 2);
        return;
      }
    }

    // 回复评论
    if (item.subItemKey !== undefined && item.itemKey !== undefined) {
      const res = await activity1Service.deleteReplyComment({
        id: item?.itemData?.id
      }).catch(() => {})
      if (res.message === '成功') {
        if (Array.isArray(_pageList[item.itemKey].childrenList)) {
          _pageList[item.itemKey].childrenList.splice(item.subItemKey, 1);
          _pageList[item.itemKey].replyNum = _pageList[item.itemKey].replyNum - 1 < 0 ? 0 :  _pageList[item.itemKey].replyNum - 1
          setCommentResult((params: CommentResultType) => ({
            ...params,
            pageList: _pageList,
          }))
        }
      }
      if (res.message) {
        // Toast.info(res.message, 2);
        return;
      }
      // if (res.message === '成功') {
      //   const count = (commentResult?.totalCount || 0) - 1;
      //   _pageList.splice(item.itemKey, 1);
      //   setCommentResult((params: CommentResultType) => ({
      //     ...params,
      //     pageList: _pageList,
      //     totalCount: count < 0 ? 0 : count
      //   }))
      // }
    }
    
  }, [commentResult])

  const getReplyList = useCallback(async (item) => {
    const _commentResult = JSON.parse(JSON.stringify(commentResult || {}));
    const _pageList = _commentResult.pageList;
    const res = await activity1Service.getReplyCommentList({
      // id: params.id,
      commentId: item.id,
      // appCode: 'cg-app',
      activityId: props.id,
      circleId: props.circleId,
      pageNo: item.childrenNextPage || 1
    }).catch(() => {})
    const { data } = res;
    if (Array.isArray(data?.pageList)) {
      _pageList[item.itemKey].childrenList = (item.childrenList || []).concat(res.data.pageList);
      _pageList[item.itemKey].childrenNextPage = res.data.nextPage;
      _pageList[item.itemKey].childrenTotalCount = res.data.totalCount;
      _pageList[item.itemKey].childrenTotalPage = res.data.totalPage;
      const { pageList, ...other } = _commentResult;
      setCommentResult({
        ...other,
        pageList: _pageList
      })
    }
  }, [commentResult])

  return (
    <ModalCmpt 
      visible={true}
      title={`活动评论（${commentResult?.totalCount || 0}）`}
      onClose={onShowComment}>
      <div style={{ minHeight: '0.50rem' }}>
        <CommentInfoContext.Provider 
          value={{
            commentInfo,
            setCommentInfo,
            onLiked,
            onDeleteComment
          }}>
          {
            !!commentResult?.pageList?.length ? 
            <ScrollCmpt 
              isScroll={commentResult.pageList.length < commentResult.totalCount}
              styles={{
                width: 'calc(100% + 0.25rem)',
                maxHeight: 'calc(85vh - 0.45rem)'
              }}
              onScrollData={() => {
                getCommentList({
                  pageNo: Math.floor(commentResult.pageList.length / 10) + 1
                })
              }}
              height={`calc(85vh - 0.45rem)`}
              >
              <List 
                listData={commentResult || {}}
                getReplyList={getReplyList} />
            </ScrollCmpt>
            : <div style={{height: '2.00rem'}}>暂无评论</div>
          }
          <div 
            className={styles.commentBottomWrapper}
            onClick={(e) => {
              e.stopPropagation();
              setCommentInfo(params => ({
                ...params,
                replyInfo: {},
                commentVisible: true
              }))
            }}>
          <Textarea placeholder="请评论" />
          </div>
          {
            !!commentInfo.commentVisible && 
            <TextareaCmpt {...props} submitComment={submitComment} />
          }
        </CommentInfoContext.Provider>
      </div>
      {/* <ActivityIndicator animating={loading} toast={true} /> */}
    </ModalCmpt>
  )
})

export default Comment;