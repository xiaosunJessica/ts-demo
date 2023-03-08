import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import ModalCmpt from '../../components/ModalCmpt';
import { useImg } from '../hooks';
const ShowImg = React.memo((props: {
  setShowImg: Function;
  url: string;
}) => {
  const { onShowImg } = useImg(props)
  return (
    <ModalCmpt 
      visible={true}
      title={'查看图片'}
      onClose={onShowImg}>
      <img src={props.url} />
    </ModalCmpt>
  )
})

export default ShowImg;
