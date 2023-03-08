import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import styles from './index.module.less';
import { useScore } from '../hooks';
import { TextArea, Button, Toast } from 'antd-mobile';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../formHooks';
import activity1Service from '../../service';
import ModalCmpt from '../../components/ModalCmpt';
import { SwipeItemProps } from '../../index';
// import { ActivityIndicator } from 'antd-mobile';

const initScoreList = (score: number): number[] => {
  let arr = new Array(10).fill(0);
  if (!score) return arr;
  return arr.map((a: number, idx: number) => {
    if (score >= idx + 1) {
      return 1;
    }
    if (score > idx) {
      return 0.5
    }
    return a;
  })
}
const Score = React.memo((props: {
  setShowScore: Function;
} & SwipeItemProps) => {
  const dispatch = useDispatch();
  const { activityShowList, activityCacheList } = useSelector((state: any) => state.activity1)

  const sumScore = useRef(0);
  const lastIdx = useRef(0);
  const { getFieldDecorator, validateFields, errors, values } = useForm<{
    comment: string;
  }>();
  const { onShowScore } = useScore(props);
  const [scoreParams, setScoreParams] = useState<{
    btnDisabled: boolean,
    scoreList: number[],
    loading: boolean,
    detail: any
  }>({
    btnDisabled: false,
    scoreList: initScoreList(0),
    loading: true,
    detail: {}
  });
  const onChangeScore = useCallback((idx) => {
    if (scoreParams.detail?.score) {
      return;
    }
    let _scoreList = [...scoreParams.scoreList]
    const filterScoreList = _scoreList.filter(score => !!score);
    console.log(filterScoreList.length - 1 !== idx, 'filterScoreList.length - 1 !== idx')
    if (filterScoreList.length - 1 !== idx) {
      _scoreList = _scoreList.map((_: any, index) => {
        if (index < idx) {
          return 1;
        }
        if (index === idx) {
          return 0.5;
        }
        return 0;
      })
    } else {

      _scoreList = _scoreList.map((score, index) => {
        if (index < idx) {
          return 1;
        }

        if (index > idx) {
          return 0;
        }

        if (index === idx) {
          if (score === 0.5) {
            return 1
          }
          // if (score === 1) {
          //   return 0;
          // }
          return 0.5
        }
        return score;
      })
    }
    setScoreParams((params) => ({
      ...params,
      scoreList: _scoreList,
    }))
  }, [scoreParams]);

  sumScore.current = 0;
  scoreParams.scoreList.forEach((score, idx) => {
    if (score) {
      lastIdx.current = idx;
      sumScore.current += score;
    }
  })

  const getScoreDetail = async () => {
    setScoreParams((params) => ({ ...params, loading: true }))
    const res = await activity1Service.getScoreDetail({
      activityId: props.id
    }).catch(() => setScoreParams((params) => ({ ...params, loading: false })))
    setScoreParams((params) => ({
      ...params,
      loading: false,
      scoreList: initScoreList((res?.score || 0)),
      detail: res
    }))
  }

  useEffect(() => {
    getScoreDetail()
  }, [])

  const submit = useCallback(async () => {
    const result = await validateFields();
    setScoreParams((params) => ({ ...params, btnDisabled: true }))
    const res = await activity1Service.giveScore({
      // cgId: props.circleId,
      // cgName: props.circleName,
      // activityId: props.id,
      // activityName: props.name,
      // commentContent: result.comment,
      // score: sumScore.current,
      // extra: JSON.stringify({
      //   isScoreComment: true
      // })
    }).catch((err: any) => {
      Toast.show(err.message)
      setScoreParams((params) => ({ ...params, btnDisabled: false }))
    })

    if (res.message) {
      Toast.show(res.message);
      return;
    }
    setScoreParams((params) => ({ ...params, btnDisabled: false }));
    if (props.swipeItemIdx !== undefined) {
      const _activityShowList = JSON.parse(JSON.stringify(activityShowList))
      const _activityCacheList = JSON.parse(JSON.stringify(activityCacheList))
      if (!_activityShowList[props.swipeItemIdx]?.hasOwnProperty('stat')) {
        _activityShowList[props.swipeItemIdx].stat = {}
        _activityCacheList[props.swipeItemIdx].stat = {}
      }
      _activityShowList[props.swipeItemIdx].stat.scoreTotal = Number((_activityShowList[props.swipeItemIdx].stat.scoreTotal || 0) + Number(sumScore.current));
      _activityCacheList[props.swipeItemIdx].stat.scoreTotal = _activityCacheList[props.swipeItemIdx].stat.scoreTotal;

      _activityShowList[props.swipeItemIdx].stat.scoreNum = Number((_activityShowList[props.swipeItemIdx].stat.scoreNum || 0) + 1);
      _activityCacheList[props.swipeItemIdx].stat.scoreNum = _activityShowList[props.swipeItemIdx].stat.scoreNum;

      _activityShowList[props.swipeItemIdx].score = Number(_activityShowList[props.swipeItemIdx].stat.scoreTotal / _activityShowList[props.swipeItemIdx].stat.scoreNum).toFixed(1) || 0
      _activityShowList[props.swipeItemIdx].score = _activityShowList[props.swipeItemIdx].score;
      // dispatch(updateActivityList({
      //   activityCacheList: _activityShowList,
      //   activityShowList: _activityShowList
      // }))
    }
    Toast.show('活动评分完成');
    onShowScore();
  }, [])
  return (
    <ModalCmpt
      visible={true}
      title={scoreParams.detail?.score ? '您的活动打分' : '请给活动打分'}
      onClose={onShowScore}>
      <div className={styles.scoreCmpt}>
        <div className={styles.scoreList} style={{paddingLeft: scoreParams.detail?.id ? 0 : '0.10rem'}}>
          {useMemo(() => scoreParams.scoreList.map((score, idx) => {
            return (
              <div className={styles.iconWrap} key={`score${idx}`}>
                <div className={styles.score}>{lastIdx.current && lastIdx.current === idx ? sumScore.current : null}</div>
                <div onClick={() => onChangeScore(idx)}>
                  {
                    (() => {
                      switch (score) {
                        case 1:
                          return <span className={`${styles.icon1} ${styles.scoreIcon}`}></span>;
                        case 0.5:
                          return <span className={`${styles.icon5} ${styles.scoreIcon}`}></span>;
                        default:
                          return <span className={`${styles.icon0} ${styles.scoreIcon}`}></span>;
                      }
                    }
                    )()
                  }
                </div>
              </div>
            )
          }), [scoreParams.scoreList])}
        </div>
        {
          !scoreParams.loading && 
          <React.Fragment>
            {
            scoreParams.detail?.id ?
              <div className={styles.commentContent}>{scoreParams.detail?.comment?.content || ''}</div>
              :
              <div className={styles.comment}>
                <form>
                  <div className={styles.item}>
                    <div className={styles.required}>
                    {
                      sumScore.current < 5 &&<span>*</span>
                    }
                    </div>
                    <div className={styles.textareaWrapper}>
                      {getFieldDecorator('comment', {
                        rules: [
                          {
                            validator: (_, value) => {
                              let errors: any = [];
                              let _value = value.trim();
                              if (sumScore.current < 5 || _value) {
                                if (!_value) {
                                  errors.push(new Error('请输入评论内容'))
                                }

                                if (_value.length < 10) {
                                  errors.push(new Error('评论不低于10个字符'))
                                }
                                if (_value.length > 500) {
                                  errors.push(new Error('评论不超过500字'))
                                }
                                let i = 0;
                                let specialStr = "~!#()_+,.;'@/'\"#$%&^*";
                                for (let str of value) {
                                  if (specialStr.includes(str)) {
                                    i++
                                  }
                                }
                                if (i && i === value.length) {
                                  errors.push(new Error('评论不能全部为特殊字符'))
                                }
                              }
                              return errors;
                            }
                          },
                          // { required: sumScore.current < 5 ? true : false, message: '评分低于5分，需要输入评论哦' },
                          // { max: 200, message: '评论不超过200字'}
                        ],
                        initialValue: ''
                      })(<TextArea 
                            className={`${styles.textarea} ${ sumScore.current < 5 ? styles.textareaRequired : ''}`} 
                            placeholder={
                              sumScore.current < 5 ?
                              "活动评价低于5分，须填写您的建议和意见" 
                              : '请输入评论'} 
                            rows={2} />)}
                      {/* {
                        sumScore.current < 5 &&
                      } */}
                      <span className={styles.error}>{errors?.comment && errors.comment[0]?.message}</span>
                      <span className={styles.tip}>提交结果后，将无法修改</span>
                    </div>
                  </div>
                  <Button
                    className={styles.btnSubmit}
                    disabled={!sumScore.current || scoreParams.btnDisabled}
                    onClick={submit}>
                    确定
                </Button>
                </form>
              </div>
          }
          </React.Fragment>
        }

       
      </div>
      {/* <ActivityIndicator animating={scoreParams.loading} toast={true} /> */}
    </ModalCmpt>
  )
})

export default Score;