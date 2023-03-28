/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState, useRef, useEffect, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwipeItem from '../SwipeItem';
import { ActiveTabContext } from '../context';
import activity1Service from '../service';
// import { updateFollowedList, updateActivityList } from 'stores/actions/activity1Action';
import styles from './index.module.less';
import { ActivityData } from '../context';
// import { usePlayIcon } from '../SwipeItem/hooks';
const clientHeight = document.documentElement.clientHeight;

type ActivityListData = {
  areaCode: string;
  attachmentList: any[]
  submitTime: number
  id: number
  location: string
  name: string;
  stat: {
    activityId: number;
    scoreNum: number;
    commentNum: number;
    forwardNum: number;
    status: number;
  }
  summary: string;
  type: string;
}



const pageSize = 10

const SwipeContainer = function () {
  const context = useContext(ActivityData)
  const [activityShowList, setactivityShowList] = useState<any[]>([])
  const [activityCacheList, setactivityCacheList] = useState<any[]>([])

  // const { activityShowList, activityCacheList } = useSelector((state: any) => state.activity1 || {})

  // 外层tab是关注还是推荐
  const { activeTab } = useContext(ActiveTabContext);

  // 用于全局记录当前滚动到的数据
  const globalDataIdx = useRef(0)

  // 获取主要容器的DOM
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // 缓存列表
  const [dataList, setDataList] = useState<{
    // cacheList: any[], // 缓存数据
    // showList: any[], // 展示列表数据
    hasMore: boolean;
    loading?: boolean;
    pageNo?: number;
  }>({
    // cacheList: [],
    // showList: [],
    hasMore: true,
    loading: true,
    pageNo: 1,
  })

  // 加载更多
  const loadMore = async (params: {
    pageNo?: number
  }) => {
    if (params.pageNo !== 1 && !dataList.hasMore) return;
    try {
      // if (page === allPage) return
      if (params.pageNo === 1) {
        setDataList(params => {
          return ({ ...params, loading: true, })
        });
      }
      // const res: ActivityListData[] = await activity1Service.fetchActivity1List({
      //   tab: activeTab === 'follow' ? 0 : 1,
      //   page: params.pageNo ? params.pageNo : dataList.pageNo,
      //   pageSize,
      // })

      const res = context.activityShowList;

      console.log(res, '-----res----res---')
      if (Array.isArray(res)) {
        if (params.pageNo === 1) {
          const _dataList = _combine(res);
          // dispatch(updateActivityList({
          //   activityCacheList: _dataList,
          //   activityShowList: _dataList,
          // }))
          setactivityShowList(_dataList)
          setDataList(params => {
            return ({ ...params, cacheList: _dataList, showList: _dataList, hasMore: !!res.length, loading: false, pageNo: (params.pageNo || 1) + 1  })
          });
          return;
        }
        const _dataList = activityCacheList.concat(_combine(res))
        // dispatch(updateActivityList({
        //   activityCacheList: _dataList,
        //   activityShowList: _dataList,
        // }))
        //  setactivityShowList(_dataList)
        setDataList(params => {
          return ({ ...params, cacheList: _dataList, showList: _dataList, hasMore: !!res.length, loading: false,  pageNo: (params.pageNo || 1) + 1  })
        });
      }

    } catch (err) {
      console.log(err)
      setDataList(params => {
        return ({ ...params, hasMore: false, loading: false,  pageNo: (params.pageNo || 1) + 1  })
      });
    }
  }


  // 整个容器的手指触发事件
  const { touchStart, touchMove, touchEnd } = useMemo(() => {
    let canMove = true;
    let startPos: {
      x: number;
      y: number
    } | null = null;
    const touchStart = (event) => {
      // event.preventDefault();
      // if (window.$noDocScroll) {
      //   return;
      // }
      if (!canMove) return;
      canMove = true;
      startPos = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      }
      console.log(startPos)
    }

    // 开始滑动
    const touchMove = (event) => {
      // event.preventDefault();
      // if (window.$noDocScroll) {
      //   return;
      // }
      if (!startPos) return;
      let posY = event.changedTouches[0].pageY
      let distance = posY - (startPos ? startPos.y : 0)
      if (!sliderContainerRef.current) return;
      const slideItem = (sliderContainerRef?.current as any)?.children;

      // const idx = Number(event?.target?.getAttribute('data-slideIdx'));
      const idx = globalDataIdx.current || 0;

      if (distance > 0) {
        // 向下滑动 => 下拉刷新
        if (idx === 0) {
          distance = distance > 75 ? 75 : distance
          sliderContainerRef.current.style.transform = `translate3d(0,${distance}px,0)`
          setTimeout(() => {
            if (sliderContainerRef.current) {
              sliderContainerRef.current.style.transform = `translate3d(0,0,0)`
            }
          }, 100)
        } else {
          distance = distance - clientHeight;
          let pre = idx - 1;
          if (pre < 0) return;
          slideItem[pre].style.transform = `translate3d(0, ${distance}px, 0)`
        }
      } else {
        // 向上滑动
        if (globalDataIdx.current === activityShowList?.length - 1) return
        let next = idx + 1;
        // 下一个列表慢慢冒出来效果
        if (slideItem[next]) {
          distance = clientHeight + distance
          slideItem[next].style.transform = `translate3d(0,${distance}px,0)`
        }
      }
    }
    const touchEnd = (event) => {
      // event.preventDefault();
      // if (window.$noDocScroll) {
      //   return;
      // }
      if (!startPos || !sliderContainerRef.current) return;
      let pos = {
        x: event.changedTouches[0].pageX,
        y: event.changedTouches[0].pageY
      }
      let distanceX = pos.x - startPos.x
      let distanceY = pos.y - startPos.y
      let horizontal = Math.abs(distanceX) >= Math.abs(distanceY)
      // const idx = Number(event.target.getAttribute('data-slideIdx'))
      const idx = globalDataIdx.current || 0
      // let slideItem = (sliderContainerRef?.current as any)?.children

      if (horizontal) {
        // 横向滚动
        if (Math.abs(distanceX) < 40) return;
        let imgIndex = activityShowList[idx].imgIndex || 0;
        if (distanceX <= -40) {
          imgIndex = (imgIndex === (activityShowList[idx]?.list?.length - 1)) ? imgIndex : imgIndex + 1
        }
        if (distanceX >= 40) {
          imgIndex = imgIndex > 0 ? imgIndex - 1 : 0;
        }
        const slickSlideContainer = sliderContainerRef.current.querySelector(`#activeSlickSlide${idx}`);
        sliderContainerRef.current.style.transform = `translate3d(0, 0, 0)`;

        // 将横向的视频都暂停
        slickSlideContainer?.querySelectorAll('video')?.forEach((video) => {
          if (!video.paused) {
            video.pause();
          }
        })

        let _showList = JSON.parse(JSON.stringify(activityShowList));
        _showList = _showList.map((l) => {
          return {
            ...l,
            imgIndex: 0
          }
        })
        _showList[idx].imgIndex = imgIndex;
        // dispatch(updateActivityList({
        //   // activityCacheList: _showList,
        //   activityShowList: _showList,
        // }))
        // setDataList(params => ({...params, showList: _showList}))

        slickSlideContainer?.querySelectorAll('video')?.forEach((video) => {
          const idx = (video?.parentNode?.parentNode?.parentNode as any)?.getAttribute('data-itemIdx')
          if (idx !== undefined && idx === imgIndex && video.paused) {
            setTimeout(() => {
              video.currentTime = 0;
              if (video?.parentNode?.parentNode?.parentNode 
                && (video.parentNode.parentNode.parentNode as any).getElementsByTagName('img')[0]?.style) {
                (video.parentNode.parentNode.parentNode as any).getElementsByTagName('img')[0].style.display = 'none'
              }
              video.play();
            }, 600)
          }
        })

      } else {
        // 纵向滚动
        // 高度不超过40 return
        if (Math.abs(distanceY) < 40) {
          animationInit()
          sliderContainerRef.current.style.transform = `translate3d(0,0,0)`
          return
        }

        // globalDataIdx目前没变，将目前列表中播放的视频暂停
        const beforeSlickSlideContainer = sliderContainerRef.current.querySelector(`#activeSlickSlide${globalDataIdx.current}`);
        beforeSlickSlideContainer?.querySelectorAll('video')?.forEach((video) => {
          if (!video.paused) {
            if (video?.parentNode?.parentNode?.parentNode 
              && (video.parentNode.parentNode.parentNode as any).getElementsByTagName('img')[0]?.style) {
              (video.parentNode.parentNode.parentNode as any).getElementsByTagName('img')[0].style.display = 'block'
            }
            video.pause();
          }
        })

        // 高度超过40
        if (distanceY >= 40) {
          //向上滚动
          // if (globalDataIdx.current === 0) {
          //   //操作第一个
          //   return
          // }

          //回退上一个
          globalDataIdx.current = (idx - 1) < 0 ? 0 : idx - 1;
          animationInit()
        }

        if (distanceY <= -40) {
          // 向下滚动
          // 滚动到最后一个
          if (globalDataIdx.current === activityShowList?.length - 1) {
            // setRefresh((params) => ({
            //   ...params,
            //   showNoMore: true,
            // }))
          } else {
            // 预加载下一个列表数据
            globalDataIdx.current = (idx === activityShowList?.length) ? activityShowList?.length : (idx + 1);
            // 小于globalDataIdx为负数，等于的为0展示，大于的为正数
            // slideItem[Number(idx) + 1].style.transform = `translate3d(0, 0, 0)`
            animationInit()
            if (activityShowList?.length - globalDataIdx.current === 2) {
              loadMore({});
            }
          }
        }

        let _showList = JSON.parse(JSON.stringify(activityShowList));
        _showList = _showList.map((l) => {
          return {
            ...l,
            imgIndex: 0
          }
        })
        // dispatch(updateActivityList({
        //   // activityCacheList: _showList,
        //   activityShowList: _showList,
        // }))
        // setDataList(params => ({...params, showList: _showList}))

        const slickSlideContainer = sliderContainerRef.current.querySelector(`#activeSlickSlide${globalDataIdx.current}`);


        const videoList = slickSlideContainer?.querySelectorAll('video')
        if (videoList && videoList[0]) {
          const firstVideoIdx = (videoList[0]?.parentNode?.parentNode?.parentNode as any)?.getAttribute('data-itemIdx');
          if (firstVideoIdx === 0) {
            setTimeout(() => {
              videoList[0].currentTime = 0;
              if (videoList[0]?.parentNode?.parentNode?.parentNode 
                && (videoList[0].parentNode.parentNode.parentNode as any).getElementsByTagName('img')[0]?.style) {
                (videoList[0].parentNode.parentNode.parentNode as any).getElementsByTagName('img')[0].style.display = 'none'
              }
              videoList[0].play();
            }, 600)
          }
        }
        sliderContainerRef.current.style.transform = `translate3d(0,0,0)`;
      }
      startPos = null;
    }

    return {
      touchStart,
      touchMove,
      touchEnd
    }
  }, [dataList, activityShowList])

  // 接口调整后,整合数据
  const _combine = (data) => {
    return data.map((item, idx) => {
      const { stat } = item;
      return Object.assign({}, item, {
        title: item.name,
        address: item.place,
        avatar: item.circleLogo,
        list: item.attachmentList ? item.attachmentList.map((attach, idx) => ({
          ...attach,
          imgIndex: idx
        })) : [],
        content: item.summary,
        imgIndex: item.imgIndex || 0, // 当前图片横向滚动的位置
        slideIndex: item.hasOwnProperty('slideIndex') ?
          item.slideIndex :
          // idx + globalDataIdx.current ? activityCacheList.length : 0,
          0,
        score: (stat.scoreNum || stat.scoreTotal) ? Number(stat.scoreTotal / stat.scoreNum).toFixed(1) : 0,
        type: item.typeName ? `#${item.typeName.join('#')}` : '',
        followed: activeTab === 'follow' ? true : false
      })
    })
  }

  const animationInit = () => {
    let slideItem = (sliderContainerRef?.current as any)?.children;
    // 按顺序，下面的全部隐藏
    for (let i = 0; i < slideItem.length; i++) {
      const num = (i - globalDataIdx.current) * 100;
      slideItem[Number(i)].style.transform = `translate3d(0, ${num}%, 0)`;
      if (globalDataIdx.current === 0) {
        slideItem[Number(i)].style.transition = `none`;
      } else {
        slideItem[Number(i)].style.transition = `all 0.5s`;
      }
      slideItem[Number(i)].style.zIndex = num === 0 ? 1 : 2;
    }
    // if (slideItem.length === 3) {
    //   slideItem[1].style.cssText = 'z-index: 1'
    //   slideItem[0].style.cssText =
    //     'z-index: 2;transform: translate3d(0,-100%,0);'
    //   slideItem[2].style.cssText =
    //     'z-index: 2;transform: translate3d(0,100%,0);'
    // } else if (slideItem.length === 2) {
    //   if (this.spreadIndex === 0) {
    //     slideItem[0].style.cssText = 'z-index: 1'
    //     slideItem[1].style.cssText =
    //       'z-index: 2;transform: translate3d(0,100%,0);'
    //   } else if (this.spreadIndex === this.spreads.length - 1) {
    //     slideItem[1].style.cssText = 'z-index: 1'
    //     slideItem[0].style.cssText =
    //       'z-index: 2;transform: translate3d(0,-100%,0);'
    //   }
    // }
  }

  useEffect(() => {
    animationInit()
  }, [dataList])

  const init = () => {
    setDataList({
      // cacheList: [],
      // showList: [],
      hasMore: true,
      pageNo: 1,
    })
    // dispatch(updateActivityList({
    //   activityShowList: [],
    //   activityCacheList: [],
    // }))
    globalDataIdx.current = 0;
    try {
      loadMore({
        pageNo: 1
      });
      animationInit();
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    init();
  }, [])


  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = 'auto'
    }
  })

  const onFollow = useCallback(async () => {
    // const { showList, cacheList } = dataList;
    const currentIdx = globalDataIdx.current - activityShowList[0].slideIndex;
    const _showList = JSON.parse(JSON.stringify(activityShowList))
    _showList[currentIdx].followed = true;
    const _cacheList = JSON.parse(JSON.stringify(activityCacheList))
    _cacheList[globalDataIdx.current].followed = true;
    // dispatch(updateActivityList({
    //   activityCacheList: _cacheList,
    //   activityShowList: _showList,
    // }))
    // setDataList(params => ({
    //   ...params,
    //   // showList: _showList,
    //   // cacheList: _cacheList
    // }))
    const result = await activity1Service.putFollowed({
      circleId: _showList[currentIdx].circleId
    }).catch(() => {
      _showList[currentIdx].followed = false;
      _cacheList[globalDataIdx.current].followed = false;
      // dispatch(updateActivityList({
      //   activityCacheList: _cacheList,
      //   activityShowList: _showList,
      // }))
      // setDataList(params => ({
      //   ...params,
      //   // showList: _showList,
      //   // cacheList: _cacheList
      // }))
    })
    if (Array.isArray(result)) {
      // Toast.info('关注成功', 2);
      // dispatch(updateFollowedList(result))
    }
  }, [activityShowList])

  return (
    <div style={{ height: '100%' }}>
      <div
        className={styles.swipeContainer}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
      >
        {/* 刷新文案展示 */}
        {/* {
        !!refresh && 
        <div className={styles.refresh}>
          正在刷新。。。
        </div>
      } */}
        {/* 主要的容器区域 */}
        <div className={styles.sliderContainer} ref={sliderContainerRef}>
          {
            useMemo(() => activityShowList?.map((data: any, index) => {
              console.log(data, '----data----')
              return (
                <div className={styles.slickSlide} key={`activeSlickSlide${index}`} data-slideIdx={index} id={`activeSlickSlide${index}`}>
                  <SwipeItem {...data} swipeItemIdx={index} onFollow={onFollow} activeItem={index === globalDataIdx.current} />
                </div>
              )
            }), [activityShowList])
          }

          {activityShowList?.length === 0 && !dataList.loading && <div className={styles.emptyPage}>
            {/* <img src={require('images/activity/pic-已结束@2x.png')} style={{ width: '1.68rem', height: '1.68rem' }} /> */}
            <p style={{ fontSize: '.14rem', color: '#666' }}>CG圈委正在签单，成交后就组织活动啦~~</p>
          </div>}

        </div>



        {/* 没有数据展示 */}
        {/* {
        !!showNoMore && 
        <div className={styles.noMore}>
          没有更多了
        </div>
      } */}
        {/* <ActivityIndicator animating={dataList.loading} toast={true} /> */}

      </div>

    </div>

  )
}

export default SwipeContainer;