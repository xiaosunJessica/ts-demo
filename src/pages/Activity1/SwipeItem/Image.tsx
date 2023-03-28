/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: your name
 * @Date: 2021-02-25 10:42:35
 * @LastEditTime: 2021-03-12 14:53:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mcg-circle-fe/client/src/pages/Activity1/SwipeItem/Image.tsx
 */
import React, { useMemo, useState } from 'react';
import styles from './image.module.less';
import ShowImg from './ShowImage';
import { useLongPress } from './hooks';
// import { Icon } from 'antd-mobile';
const Image = React.memo((props: {
  url: string
}) => {
  const [ imageVisible, setImageVisible ] = useState<boolean>(false);
  const [ loading, setLoading ] = useState(true)
  const setShowImage = () => {
    setImageVisible((param: any) => !param)
  }

  const { touchStart, touchMove, touchEnd } = useLongPress(props)
  return (
    <React.Fragment>
       <img 
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        className={styles.img} 
        src={props.url}
        onLoad={() => {setLoading(false)}}
        onError={() => {setLoading(false)}} />
        {
          !!loading && 
          <div className={styles.loading}>
            {/* <Icon type="loading" size="md" /> */}
          </div>
        }
    </React.Fragment>
    // <div className={styles.imageWrapper}>
      
    //   {/* {
    //     !!imageVisible && 
    //     <ShowImg url={props.url} setShowImg={setImageVisible} />
    //   } */}
    // </div>
  )
})

export default Image