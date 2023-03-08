/*
 * @Author: your name
 * @Date: 2021-02-03 14:25:00
 * @LastEditTime: 2021-03-01 18:43:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mcg-circle-fe/client/src/pages/Activity1/SearchContainer/index.tsx
 */
import React, { useCallback, useMemo, useState } from 'react';
import { SearchBar, Button } from 'antd-mobile';
import { RouteComponentProps } from 'react-router-dom';
import Card from './Card';
import useForm from '../formHooks';
import debounce from 'lodash/debounce';
import activity1Service from '../service';
import ScrollCmpt from '../components/ScrollCmpt';
import styles from './index.module.less';

const SearchContainer = (props: RouteComponentProps) => {
  // 搜索loading状态
  const [loading, setLoading] = useState<boolean>(false)
  // 搜索结果
  const [result, setResult] = useState<{
    list: any[],
    total: number|undefined;
    pageNo: number;
    hasMore: boolean;
  }>({
    list: [],
    total: undefined,
    pageNo: 0,
    hasMore: true,
  })
  const { getFieldDecorator, getFieldValue, setFieldsValue } = useForm<{
    keyword: string;
  }>();


  const getSearchResult = debounce(async({ pageNo }) => {
    const keyword = getFieldValue('keyword');
    console.log(keyword, 'keywordkeyword', result.hasMore)
    if (keyword && (pageNo || result.hasMore)) {
      setLoading(true)
      const res = await activity1Service.searchActivityList({
        search: keyword,
        page: pageNo || (result.pageNo + 1),
        pageSize: 20,
      }).catch(() => setLoading(false));
      setLoading(false)
      const list = res.pageList || [];
      setResult({
        list: pageNo ? list : result.list.concat(list),
        total: res.totalCount,
        pageNo: res.pageNo,
        hasMore: res.pageNo * res.pageSize < res.totalCount
      })
    }
  }, 500)

  const onSearch = useCallback(getSearchResult, [result]);

  const onReset = useCallback(() => {
    console.log('0000result----')
    setFieldsValue({
      keyword: ''
    })
    setResult({
      list: [],
      total: undefined,
      pageNo: 0,
      hasMore: true,
    })
  }, [])

  return (
    <ScrollCmpt onScrollData={() => onSearch({})}>
      <div className={styles.searchContainer}>
        <div className={styles.header}>
          {/* <div 
            className={styles.iconBack} 
            onClick={() => {
              props.history.goBack();
            }}/> */}
          <div className={styles.searchWrapper} >
            {
              getFieldDecorator('keyword')( 
              <SearchBar 
                className={styles.searchBar} 
                placeholder="请输入关键字" 
                maxLength={8} 
                showCancelButton={true}
                onClear={onReset}
                onCancel={() => {props.history.goBack();}} />
              )
            }
            <Button 
              className={styles.btnSearch} 
              onClick={() => onSearch({pageNo: 1})}
              disabled={!getFieldValue('keyword')}>
              搜索
            </Button>
          </div>
        </div>
        {
          result.total !== undefined &&
          <React.Fragment>
            {
              !!result?.list?.length ?
                <div className={styles.result}>
                  <div className={styles.title}>搜索结果</div>
                  <div className={styles.list}>
                    {/* {
                      useMemo(() => result.list && result.list.map((l) => {
                        const obj: any = {
                          headPic: l.circleLogo,
                          name: l.name,
                          summary: l.summary,
                          type: l.typeName & l.typeName.join('#')
                        }
                        return <Card {...obj} />
                      }), [result])
                    } */}
                    {
                      result.list && result.list.map((l) => {
                        const obj: any = {
                          headPic: l.attachmentList && l.attachmentList[0]?.image,
                          name: l.name,
                          summary: l.summary,
                          type: l.typeName && l.typeName.join('#'),
                          id: l.id
                        }
                        return <Card key={l.id} {...obj} />
                      })
                    }
                  </div>
                </div>
              : <div>暂无搜索结果，请重新搜索</div>
            }
          </React.Fragment>
        }
        
        {/* <ActivityIndicator animating={loading} toast={true} /> */}
      </div>
    </ScrollCmpt>
  )
}

export default SearchContainer;