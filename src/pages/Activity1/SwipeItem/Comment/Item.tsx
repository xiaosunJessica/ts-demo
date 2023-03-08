import React, { useCallback, useContext, useMemo, useState } from 'react';
import styles from './index.module.less';
import moment from 'moment';
import { Modal } from 'antd-mobile';
import { CommentItemType } from './index'; 
import { CommentInfoContext } from './context'; 
import { useStore } from 'react-redux';

const alert = Modal.alert;

const Item = React.memo((props: {
  children?: React.ReactNode;
  smAvatar?: boolean;
  itemData: CommentItemType;
  itemKey?: number;
  subItemKey?: number;
  cls?: string;
}) => {
  const context: any = useContext(CommentInfoContext);
  const [ modalVisible, setModalVisible ] = useState<boolean>(false)
  const onReply = useCallback(() => {
    context.setCommentInfo(params => ({
      ...params,
      replyInfo: props.itemData,
      commentVisible: true,
      itemKey: props.itemKey
    }))
  }, [props.itemData, props.itemKey])

  const onDelete = useCallback(() => {
    // alert('确认删除该评论', null, [
    //   { text: '确认', onPress: () => context.onDeleteComment({
    //     itemData: props.itemData,
    //     itemKey: props.itemKey,
    //     subItemKey: props.subItemKey,
    //   })},
    //   { text: '取消', onPress: () => console.log('否')}
    // ])
    context.onDeleteComment({
      itemData: props.itemData,
      itemKey: props.itemKey,
      subItemKey: props.subItemKey,
    })
  }, [props.itemData, props.itemKey, props.subItemKey])

  const onLiked = useCallback(() => {
    context.onLiked({
      itemData:  props.itemData,
      itemKey: props.itemKey,
      subItemKey: props.subItemKey,
    })
  }, [props.itemData, props.itemKey, props.subItemKey])
  
  let extra: any = {};
  try {
    extra = JSON.parse(props.itemData.extra)
  } catch (error) {
    
  }

  const onClose = useCallback(() => {
    setModalVisible(false)
  }, [])
  return (
    <div className={props.cls}>
      <div className={styles.item}>
        <div className={`${styles.avatar} ${props.smAvatar ? styles.smAvatar: ''}`}>
          <img src={props.itemData?.avatar} />
        </div>
        <div className={styles.itemWrapper}>
          <div className={styles.selfContainer}>
            <div className={styles.header}>
              <div>
                <div className={styles.useInfo}>
                  <span className={styles.name}>
                  {props.itemData?.commenter}
                  </span>
                  <span className={styles.userCode}>
                  ({props.itemData?.commenterCode})
                  </span>
                  {
                    // props.itemData?.commenterCode == window.$userInfo?.userCode &&
                    // <span className={styles.author}>
                    //   作者
                    // </span>
                  }
                </div>
                <div className={styles.type}>
                {props.itemData?.circleName}
                </div>
              </div>
              <div className={styles.heart}>
                <div 
                  className={`${styles.heartIcon} ${props.itemData?.liked ? styles.redHeart : styles.grayHeart}`}
                  onClick={onLiked} />
                <div className={`${styles.heartTotal} ${props.itemData?.liked ? styles.red : styles.gray}`}>{props.itemData?.likes > 0 ? props.itemData?.likes : 0}</div>
              </div>
            </div>
            <div className={styles.cmtContent}>
              {!!extra?.commentName && <span className={styles.replyUser}>@{extra.commentName}</span>}
              {props.itemData?.content}
            </div>
            <div className={styles.footer}>
              <div>
                <span className={styles.time}>{props.itemData?.createTime && moment(props.itemData?.createTime).fromNow()}</span>
                <span className={styles.reply} onClick={onReply}>回复</span>
              </div>
              {
                // !extra?.isScoreComment && props.itemData?.commenterCode == window.$userInfo?.userCode && 
                // <div>
                //   <span className={styles.deleteIcon} onClick={() => setModalVisible(true)} />
                // </div>
              }
            </div>
          </div>
          <div className={styles.children}>
            {props.children}
          </div>
        </div>
       
      </div>
      <Modal
        visible={modalVisible}
        onClose={onClose}
        className={styles.deleteModal}
        >
        <div className={styles.delete} onClick={onDelete}>删除评论</div>
        <div className={styles.cancel} onClick={onClose}>取消</div>
      </Modal>
    </div>
  )
})

export default Item;