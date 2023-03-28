import React from 'react';

export const ActiveTabContext = React.createContext({
  activeTab: 'recommend',
})

export const ActivityData= React.createContext<{
  followedList: any[],
  activityShowList: any[],
  activityCacheList: any[],
}>({
  followedList: [],
  activityShowList: [{
  areaCode: '1',
  attachmentList: [{
    image: 'https://f.video.weibocdn.com/o0/rSGSbdWQlx083JK1WSzK010412005ETD0E010.mp4?label=mp4_hd&template=288x640.24.0&ori=0&ps=1BVp4ysnknHVZu&Expires=1678446439&ssig=Z%2BE48hMSVv&KID=unistore,video',
  }],
  submitTime: new Date().getTime(),
  id: 1,
  location: '1',
  name: '12344',
  stat: {
    activityId: '1',
    scoreNum: '2',
    commentNum: '3',
    forwardNum: '4',
    status: '5'
  },
  summary: '12344',
  type: '123455'
}, {
  areaCode: '1',
  attachmentList: [{
    image: 'https://f.video.weibocdn.com/o0/rSGSbdWQlx083JK1WSzK010412005ETD0E010.mp4?label=mp4_hd&template=288x640.24.0&ori=0&ps=1BVp4ysnknHVZu&Expires=1678446439&ssig=Z%2BE48hMSVv&KID=unistore,video',
  }],
  submitTime: new Date().getTime(),
  id: 1,
  location: '1',
  name: '12344',
  stat: {
    activityId: '1',
    scoreNum: '2',
    commentNum: '3',
    forwardNum: '4',
    status: '5'
  },
  summary: '12344',
  type: '123455'
}],
  activityCacheList: []
})

