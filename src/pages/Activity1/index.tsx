/*
 * @Author: your name
 * @Date: 2021-01-27 15:08:52
 * @LastEditTime: 2021-03-01 16:43:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mcg-circle-fe/client/src/pages/Activity1/index.tsx
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import SwipeContainer from './SwipeContainer';
import { Link } from "react-router-dom";
import { ActiveTabContext } from './context';
import activity1Service from './service';
// import { updateFollowedList } from 'stores/actions/activity1Action';
// import Position from 'components/Position';
import styles from './index.module.less';
export type SwipeItemProps = {
  id: number; // 活动id
  name: string; // 活动name
  circleId: number; // cgID,
  circleName: string; // cgName
  title: string;
  address: string;
  submitTime: number;
  list: any[];
  content: string;
  score: number;
  type: string;
  avatar: string;
  index: number;
  followed: boolean;
  summary: string;
  swipeItemIdx?: number;
}
const Activity1 = function () {
  // tab 包括推荐 +关注
  const [activeTab, setActiveTab] = useState<'follow' | 'recommend'>('recommend');
  const dispatch = useDispatch();

  const getAllFollowed = async () => {
    const res = await activity1Service.getAllFollowedList({
      // userCode: window.$userInfo.userCode
    })
    if (Array.isArray(res)) {
      // dispatch(updateFollowedList(res))
    }
  }
  useEffect(() => {
    getAllFollowed()
  }, [])

  const handleChangeCity = (val) => {
    console.log(val, '--------val-----val----')
  };
  return (
    <ActiveTabContext.Provider 
      value={{ 
        activeTab,
      }}>
      <div className={styles['activity-container']}>
        <div className={styles.header}>
          <div className={styles.address}>
            {/* <span className={styles.iconAddress} /> */}
            <div className={styles.city}>
              {/* <Position
                onChange={(val) => handleChangeCity(val)}
              /> */}
            </div>
          </div>
          <div className={styles.tabList}>
            <div
              className={`${styles.tab} ${activeTab === 'recommend' ? styles.active : ''}`}
              onClick={useCallback(() => setActiveTab('recommend'), [])} >
              推荐
            </div>
            <div
              className={`${styles.tab} ${activeTab === 'follow' ? styles.active : ''}`}
              onClick={useCallback(() => setActiveTab('follow'), [])} >
              关注
            </div>
          </div>
          {/* <Link className={styles.search} to="/p/new/activitySearch" /> */}
        </div>
        <SwipeContainer />
      </div>
    </ActiveTabContext.Provider>
  )
}

export default Activity1;
