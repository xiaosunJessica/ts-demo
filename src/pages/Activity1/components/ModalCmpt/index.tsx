/*
 * @Author: your name
 * @Date: 2021-02-25 10:42:35
 * @LastEditTime: 2021-03-01 15:41:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /mcg-circle-fe/client/src/pages/Activity1/components/ModalCmpt/index.tsx
 */
import React from 'react';
import Mask from '../../Modal/Mask';
// import { Icon } from 'antd-mobile';
import styles from './index.module.less';
const ModalCmpt = (props: {
  visible: boolean;
  title?: string;
  onClose: () => void;
  maskClosable?: boolean;
  children: React.ReactNode;
  modalCmpStyle?: any;
}) => {
  if (!props.visible) return null;
  return  (
    <Mask 
      visible={!!props.visible} 
      onCancel={() => {
        if (typeof props.onClose === 'function') {
          props.onClose()
        }
      }}
      maskClosable={props.maskClosable}>
      <div className={styles.ModalCmpt} style={{...props.modalCmpStyle}}>
        {
          props.title &&
          <div className={styles.header}>
            <p>{props.title}</p>
            {/* <Icon 
              type="icon-navbar-close" 
              className={styles.close} 
              onClick={props.onClose}
              style={{color: '#000000'}} /> */}
          </div>
        }
        <div className={styles.body}>
          {props.children}
        </div>
      </div>
    </Mask>
  )
}

export default ModalCmpt;