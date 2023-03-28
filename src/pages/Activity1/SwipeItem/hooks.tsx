/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: your name
 * @Date: 2021-02-25 10:42:35
 * @LastEditTime: 2021-03-10 18:42:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mcg-circle-fe/client/src/pages/Activity1/SwipeItem/hooks.tsx
 */
import React, { useMemo, useState } from 'react';
// import { downVideo, isVideo } from 'utils/commonHelper'

// 评论状态
export const useComment = (props) => {
  return useMemo(() => {
    const onShowComment = () => props.setShowComment((param) => {
      // if (!param) {
      //   window.$noDocScroll = true
      // } else {
      //   window.$noDocScroll = false
      // }
      return !param
    })
    return {
      onShowComment
    }
  }, [])
}

// 打分
export const useScore = (props) => {
  return useMemo(() => {
    const onShowScore = () => props.setShowScore((param) => {
      // if (!param) {
      //   window.$noDocScroll = true
      // } else {
      //   window.$noDocScroll = false
      // }
      return !param
    })
    return {
      onShowScore
    }
  }, [])
}

// 查看 图片
export const useImg = (props) => {
  return useMemo(() => {
    const onShowImg = () => props.setShowImg((param) => {
      // if (!param) {
      //   window.$noDocScroll = true
      // } else {
      //   window.$noDocScroll = false
      // }
      return !param
    })
    return {
      onShowImg
    }
  }, [])
}

export const useLongPress = (props: {
  url: string;
}) => {
  return useMemo(() => {
    let timeOutEvent, longClick;
    const touchStart1 = function(){
      longClick=0;//设置初始为0
      timeOutEvent = setTimeout(function(){
          //此处为长按事件-----在此显示遮罩层及删除按钮
          // if (isVideo(props.url)) {
          //   downVideo(props.url, '')
          // } else {
          //   window.$ljBridge.ready((bridge, webStatus) => {
          //     const img = props.url.replace(/^http[s]:/, window.location.protocol);
          //     if (webStatus.isBeike || webStatus.isLinkApp) {
          //       bridge.saveImageUrl(img)
          //     } else {
          //       const schemeUrl = `component/saveimage_url?image_url=${encodeURIComponent(
          //         img
          //       )}`
          //       console.log(schemeUrl, 'schemeUrlschemeUrl')
          //       bridge.actionWithUrl(bridge.getSchemeLink(schemeUrl))
          //     }
          //   })
          // }
          longClick=1;//假如长按，则设置为1
      },500);
    };
    const touchMove1 = function(e: any){
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
        e.preventDefault();
    };
    const touchend1 = function(){
        clearTimeout(timeOutEvent);
        if(timeOutEvent!==0 && longClick===0){//点击
            //此处为点击事件----在此处添加跳转详情页
            console.log('--------dianji----')
        }
        return false;
    }
    return {
      touchStart: touchStart1, 
      touchMove: touchMove1, 
      touchEnd: touchend1
    }
  }, [props])
}

// icon展示问题
export const usePlayIcon = () => {
  const [ showPlayIcon, setShowPlayIcon ] = useState<boolean>(false)
  const setPlayIcon = (bool) => setShowPlayIcon((param) => {
    return bool === undefined ? !param : bool
  })
  return {
    showPlayIcon,
    setPlayIcon
  }
}
