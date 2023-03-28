/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback,  useRef, useState } from 'react';
import styles from './video.module.less';
// import { usePlayIcon } from './hooks';
// import { Icon } from 'antd-mobile';

const playIcon = '';
let videoProcessInterval;

const VideoCmpt = (props: {
  url: string,
  active: boolean;
}) => {

  const [ loading, setLoading ] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null);
  const onPlayVideo = () => {
    setLoading(false);
    try {
      let video = videoRef.current;
      if (!video) return;
      if (!video.paused) {
        video.pause();
        // setPlayIcon(true)
        if (video?.parentNode 
          && (video?.parentNode as any).getElementsByTagName('img')[0]?.style) {
          (video?.parentNode as any).getElementsByTagName('img')[0].style.display = 'block'
        }
        clearInterval(videoProcessInterval)
      } else {
          // wx.ready(() => {
          //     // 在微信的ready中进行播放 不管成功配置与否 都会执行ready
          //     video.play();
          // })
          if (video?.parentNode 
            && (video?.parentNode as any).getElementsByTagName('img')[0]?.style) {
            (video?.parentNode as any).getElementsByTagName('img')[0].style.display = 'none'
          }
          video.play();
          video.pause();
          setTimeout(() => {
            if(!video) return;
            video.play();
            // setPlayIcon(false)
            videoProcessInterval = setInterval(() => {
                changeProcess()
            }, 100)
          }, 100)
      }
    } catch (e) {
        alert(e)
    }
  }

  const onLoadedMetadata = () => {
    setLoading(false);
  }

  const onError = useCallback(() => {
    setLoading(false)
  }, [props])

  const onPlayEnd = () => {
    // this.isVideoShow = true
    // this.current += this.current
  }

   //记录播放进度
  const changeProcess = () => {
    // let video = document.querySelectorAll('video')[this.current];
    // let currentTime = video.currentTime.toFixed(1);
    // let duration = video.duration.toFixed(1);
    // this.videoProcess = parseInt((currentTime / duration).toFixed(2) * 100)
  }

  console.log(props.url, '-----url----')
  if (!props.url) return null;
  return  <div>
            <video 
              ref={videoRef}
              className={styles.videoCmpt} 
              // loop 
              webkit-playsinline="true" 
              x5-video-player-type="h5-page"
              x5-video-player-fullscreen="true" 
              playsInline={true}
              preload="auto"
              poster={''}
              //muted
              // autoPlay
              src={props.url}
              onClick={onPlayVideo}
              onEnded={onPlayEnd}
              onLoadedMetadata={onLoadedMetadata}
              // onTouchStart={touchStart}
              // onTouchMove={touchMove}
              // onTouchEnd={touchEnd}
              onError={onError}
              >
              <source src={props.url} type="video/mp4" />
              <source src={props.url} type="video/ogg"></source>
            </video>
          <img 
            className={styles.playIcon}
            style={{ display: 'none'}} 
            onClick={onPlayVideo}
            src={playIcon}/>
          {
            !!loading && 
            <div className={styles.loading}>
              {/* <Icon type="loading" size="md" /> */}
            </div>
          }
  </div>

}

export default VideoCmpt;