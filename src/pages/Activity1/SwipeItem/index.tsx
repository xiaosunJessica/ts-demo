import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { SwipeItemProps } from '../index';
import VideoCmpt from './Video';
import Image from './Image';
import Comment from './Comment';
import Score from './Score';
import { useComment, useScore } from './hooks';
import moment from 'moment';
import { getCharLen, isVideo } from '../utils';
import activity1Service from '../service';
import styles from './index.module.less';
const defaultAvatar = '';
const clientWidth = document.documentElement.clientWidth;
interface SwipeItemCompProps extends SwipeItemProps {
  imgIndex?: number;
  activeItem?: boolean;
}
const FooterContainer = (props: SwipeItemCompProps) => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.address}>
        <span className={styles.iconAddress} />
        <span>{props.address}</span>
        <span className={styles.time}>{props.submitTime ? moment(props.submitTime).fromNow() : ''}</span>
      </div>
      <div className={styles.title}>
        {props.circleName}-{props.title}
      </div>
      <div className={styles.type}>
        {props.type}
      </div>
      <div className={styles.contentWrap}>
        <a href={`/p/circle/finish/${props.id}`} className={styles.content}>
          {getCharLen(props.content) > 70 ? props.content.substring(0, 44) : props.content}
          {getCharLen(props.content) > 70 &&
            <p className={styles.showAll}>
              &nbsp;...
              <span>查看全文</span>
            </p>
          }
        </a>
      </div>
    </div>
  )
}

const RightContainer = (props: SwipeItemCompProps & {
  setShowComment: Function;
  setShowScore: Function;
  onFollow: Function;
}) => {
  const { followedList } = useSelector((state: any) => state.activity1);

  const { onShowComment } = useComment(props);
  const { onShowScore } = useScore(props);
  // 外层tab是关注还是推荐
  const onFollow = useCallback((e) => {
    // e.stopPropagation();
    // e.nativeEvent.stopPropagation();
    e.preventDefault();
    props.onFollow()
  }, [])

  // 分享
  const onShare = useCallback(async () => {
    // const { id } = props.match.params;
    // const { detail } = this.state;
    var shareconfig = {
      articleTitle: props.name,
      // requestUrl: `${$envLink}/q/share/${props.id}`,
      articleDiscription: props.summary,
      headImageUrl: "../../../images/logo.png",
      channel: "",
    };
    await activity1Service.shareActivity({
      id: props.id
    })
    //呼起分享弹层
    // window.$ljBridge.ready(function (bridge, webstatus) {
    //   console.log(webstatus)
    //   bridge.actionShareWithString(JSON.stringify(shareconfig));
    // });
  }, [props])
  return (
    <div className={styles.rightContainer}>
      <div className={`${styles.avatarWrapper}`}>
        <a href={`/p/new/activity?circleId=${props.circleId}`}>
          <div className={styles.avatar}>
            <img src={props.avatar || defaultAvatar} />
          </div>
          <div className={styles.followStatus}>
            {
              followedList?.includes(props.circleId) ?
                <label className={styles.followed}>已关注</label> :
                <label className={styles.unFollow} onClick={onFollow}>关注</label>
            }
          </div>
        </a>
      </div>
      <div className={styles.scoreWrapper} onClick={onShowScore}>
        <div className={styles.score}>{props.score}</div>
      </div>
      <div className={styles.commentWrapper} onClick={onShowComment}>
        <div className={styles.iconComment} />
        <div className={styles.label}>评论</div>
      </div>
      <div className={styles.shareWrapper} onClick={onShare}>
        <div className={styles.iconShare} />
        <div className={styles.label}>分享</div>
      </div>
    </div>
  )
}

const ListContainer = (props: SwipeItemCompProps) => {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    try {
      // let _list = JSON.parse();
      setList(props.list)
    } catch (error) {

    }
  }, [props.list])

  const renderSlideDots = () => {
    return new Array(list.length || 0).fill(1).map((_: any, idx: number) => {
      // console.log(list.length, '----lift')
      return <li className={`${idx === props.imgIndex ? styles.activeDot : ''} ${styles.dot}`} />
    })
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.list} style={{ width: `${list.length * clientWidth}px`, transform: `translate3d(-${(props.imgIndex || 0) * clientWidth}px, 0, 0)` }}>
        {
          useMemo(() => list?.map((l: any, idx: number) => {
            return (
              <div className={styles.item} key={`$${l.image}-${idx}`} style={{ width: `${clientWidth}px` }} data-itemIdx={idx}>
                {
                  !!isVideo(l.image) ? <div className={styles.videoWrapper}><VideoCmpt url={l.image} active={props.imgIndex===idx && !!props.activeItem} /> </div>:
                  <div className={styles.imgWrapper}><Image url={l.image} /></div>
                }
              </div>
            )
          }), [list])
        }
      </div>
      {
        !(list && list[props.imgIndex || 0]?.image && !!isVideo(list[props.imgIndex || 0]?.image)) &&
        <ul>
          {
            renderSlideDots()
          }
        </ul>
      }
    </div>
  )
}
const SwipeItem = (props: SwipeItemCompProps & {
  onFollow: Function;
}) => {
  const [showComment, setShowComment] = useState<boolean>(false);
  const [showScore, setShowScore] = useState<boolean>(false);
  return (
    <div className={styles.swipeItem}>
      <ListContainer {...props} />
      <RightContainer
        {...props}
        setShowComment={setShowComment}
        setShowScore={setShowScore} />
      <FooterContainer {...props} />
      {
        !!showComment && <Comment setShowComment={setShowComment} activityId={props.id} {...props} />
      }
      {
        !!showScore && <Score setShowScore={setShowScore} {...props} />
      }
    </div>
  )
}

export default SwipeItem;