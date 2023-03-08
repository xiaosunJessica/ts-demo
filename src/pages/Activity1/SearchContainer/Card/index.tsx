import React, { useEffect, useState, useRef } from 'react';
import { getVideoBase64, isVideo } from '../../utils';
import styles from './index.module.less';
type CardType = {
  headPic: string;
  name: string;
  type: string;
  summary: string;
  id: number
}
const Card = (props: CardType) => {
  const [ url, setUrl ] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (props.headPic) {
      if (isVideo(props.headPic)) {
        // getVideoBase64(props.headPic).then((resUrl) => {
        //   setUrl(resUrl)
        // })
      } else {
        setUrl(props.headPic)
      }
    }
  }, [props.headPic])

  const getVideoImage = (e: any) => {
    const width = e.target.videoWidth;
    const height = e.target.videoHeight;
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    let video: any = videoRef.current;
    if (!video) return;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")?.drawImage(e.target, 0, 0, width, height);
    const dataUrl: any = canvas.toDataURL("image/jpeg");
    e.target.setAttribute("poster", dataUrl);
    setUrl(dataUrl)
    // iOS设备不会主动执行onLoadedData方法,必须设置autoPlay=true
    // 当查找到视频 loadstart：视频查找。当浏览器开始寻找指定的音频/视频时触发，也就是当加载过程开始时
    video.addEventListener('loadstart', function () {
      if (video.currentTime > 0) {
        video.pause();
      }
    })
  };
  return (
    <a className={styles.card} href={`/p/circle/finish/${props.id}`} >
      <div className={styles.headPic}>
        <img src={url} />
      </div>
      {
        isVideo(props.headPic) && !url &&
          <video 
              ref={videoRef}
              preload="auto"
              controls={false}
              id="video1"
              poster={''}
              autoPlay
              x5-video-player-type="h5"
              playsInline={true}
              style={{ width: "100%", height: "100%", objectFit: "fill", display: 'none' }}
              crossOrigin="anonymous"
              onLoadedData={(e) => getVideoImage(e)}
              // onTouchStart={touchStart}
              // onTouchMove={touchMove}
              // onTouchEnd={touchEnd}
              >
              <source src={props.headPic} type="video/mp4" />
              <source src={props.headPic} type="video/ogg"></source>
            </video>
      }
      <div className={styles.content}>
        <div className={styles.name}>
          {props.name}
        </div>
        <div className={styles.type}>
          {props.type}
        </div>
        <div className={styles.summary}>
          {props.summary}
        </div>
      </div>
    </a>
  )
}

export default Card;