/*
 * @Author: your name
 * @Date: 2021-01-27 15:08:52
 * @LastEditTime: 2021-03-01 16:43:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mcg-circle-fe/client/src/pages/Activity1/index.tsx
 */

import React, { useState, useEffect, useCallback } from 'react';
import SwipeContainer from './SwipeContainer';
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

function fontAdapt(baseWidth = 7.5, maxWidth = Infinity) {
  const docEl = document.documentElement;
  docEl.style.fontSize = `${Math.min(docEl.clientWidth, maxWidth) / baseWidth}px`;
}

fontAdapt(3.75)


const Activity1 = function () {
  // tab 包括推荐 +关注
  const [activeTab, setActiveTab] = useState<'follow' | 'recommend'>('recommend');

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
          </div>
          {/* <Link className={styles.search} to="/p/new/activitySearch" /> */}
        </div>
        <SwipeContainer />
      </div>
    </ActiveTabContext.Provider>
  )
}

export default Activity1;
