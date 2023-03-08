import React, { useState, useCallback, useContext, useEffect, useRef } from 'react';
import { TextArea, Button } from "antd-mobile";
import useForm from '../../formHooks';
import activity1Service from '../../service';
import { CommentInfoContext } from './context';
import ModalCmpt from '../../components/ModalCmpt';
import styles from './index.module.less';
import { SwipeItemProps } from '../../index';

export const Textarea = (props: any) => {
  return <TextArea 
          className={styles.textarea} 
          {...props} />
}
const CommentTextarea = (props: {
  submitComment: (param: any) => {}
} & SwipeItemProps) => {
  const [ btnDisabled, setBtnDisabled ] = useState<boolean>(false);
  const autoFocusInst = useRef<any>(null);
  const { getFieldDecorator, validateFields, errors, getFieldValue} = useForm<{
    comment: string;
  }>();
  const context: any = useContext(CommentInfoContext);
  const [placeholder, setPlaceholder] = useState('请评论');

  useEffect(() => {
    setPlaceholder(context?.commentInfo?.replyInfo?.commenter ? `@${context?.commentInfo?.replyInfo?.commenter}:` : '请评论')
  }, [context.commentInfo])

  // 取消回复人
  const onCancel = useCallback(() => {
    context.setCommentInfo(params => ({
      ...params,
      replyInfo: {}
    }))
  }, [context])

  const submit = useCallback(async () => {
    const values = await validateFields();
    setBtnDisabled(true);
    //提交
    props.submitComment({
      content: values.comment
    })
    console.log(values, props)
  }, [])

  useEffect(() => {
    console.log(autoFocusInst.current, 'autoFocusInst.currentautoFocusInst.current')
    if (autoFocusInst.current) {
      autoFocusInst.current.focus();
    }
  }, [])
  return (
    <ModalCmpt 
      visible={true} 
      modalCmpStyle={{ borderRadius: 'unset', padding: '0.12rem 0.12rem 0.12rem 0.16rem'}}
      onClose={() => {
        context.setCommentInfo(params => ({
          ...params,
          replyInfo: {},
          commentVisible: false
        }))
      }} 
      maskClosable={true}>
      <div className={styles.commentTextarea}>
        <div className={styles.textareaWrapper}>
        {
          getFieldDecorator('comment', {
            rules: [
              { required: true, message: '请输入评论内容'},
              // { min: 10, message: '评论不低于10个字符'},
              { max: 200, message: '评论不超过200字'},
              // {validator: (_, value) => {
              //   let errors: any = [];
              //   let _value = value.trim();
              //   if (!_value) {
              //     errors.push(new Error('请输入评论内容'))
              //   }

              //   if (_value.length < 10) {
              //     errors.push(new Error('评论不低于10个字符'))
              //   }
              //   if (_value.length > 200) {
              //     errors.push(new Error('评论不超过200字'))
              //   }
              //   // let i = 0;
              //   // let specialStr = "~!#()_+,.;'@/'\"#$%&^*";
              //   // for (let str of value) {
              //   //   if (specialStr.includes(str)) {
              //   //     i++
              //   //   }
              //   // }
              //   // if (i && i === value.length) {
              //   //   errors.push(new Error('评论不能全部为特殊字符'))
              //   // }
              //   return errors;
              // }},
            ],
            initialValue: "" 
          })(<TextArea 
              ref={el => autoFocusInst.current = el}
              placeholder={placeholder}  
              className={styles.textarea} />)
        }
        </div>
        <div 
          className={`${styles.btnSubmit} ${(btnDisabled || !getFieldValue('comment')) ? styles.disabled : ''}`} 
          onClick={submit}>
          发表
        </div>
      </div>
      <span className={styles.error}>{errors?.comment && errors.comment[0]?.message}</span>
    </ModalCmpt>
  )
}

export default CommentTextarea;