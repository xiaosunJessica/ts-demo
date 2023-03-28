import React, { useEffect, useState, useRef } from "react";
import './index.css';
const context = require.context('./images', true, /.png/);

const Dongxiao = () => {
  const arr = new Array(11).fill(0);
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const onClickItem = (idx) => {
    setActiveIdx(idx)
  }

  const onKeydown = (e) => {
    if (e.keyCode === 39) {
      if (activeIdx < arr.length - 1) {
        setActiveIdx(activeIdx + 1)
      }
    }

    if (e.keyCode === 37) {
      if (activeIdx >= 1) {
        setActiveIdx(activeIdx - 1)
      }
    }
  }

  const scroll = () => {
    const scrollContainer: any = scrollRef.current;
    if (!scrollContainer) return;
    const offsetWidth = scrollContainer.offsetWidth;
    const scrollWidth = scrollContainer.scrollWidth;
    const scrollLeft = scrollContainer.scrollLeft;

    const maxScrollDistance = scrollWidth - offsetWidth;
    const activeItem = scrollContainer.children.item(activeIdx);

    const activeItemLeft = activeItem.offsetLeft;
    const activeItemWidth = activeItem.offsetWidth;

    console.log(offsetWidth, scrollWidth, scrollLeft)
    if (maxScrollDistance <= 0) return;
    let nextScrollLeft = activeItemLeft - (offsetWidth - activeItemWidth) / 2;
    nextScrollLeft = Math.min(nextScrollLeft, maxScrollDistance);
    scrollContainer.scrollTo({
      left: nextScrollLeft,
      top: 0,
      behavior: 'smooth'
    })
    //  const delta = nextScrollLeft - scrollLeft

    // let hasMoved = 0
    // const segmentation = delta / 10
    // const scrollFrame = () => {
    //   if (Math.abs(hasMoved) < Math.abs(delta)) {
    //     hasMoved += segmentation
    //     scrollContainer.scrollLeft += segmentation
    //     window.requestAnimationFrame(scrollFrame)
    //   }
    // }
    // scrollFrame()
  }
  useEffect(() => {
    scroll()
  }, [activeIdx])
  useEffect(() => {
   document.addEventListener('keydown', onKeydown)
    return () => {
     document.removeEventListener('keydown', onKeydown)
    }
  }, [activeIdx])
  return (
    <div className="dongxiao">
      <ul className="container" ref={scrollRef}>
        {arr.map((a, idx) => {
          return (
            <li className={`item ${activeIdx === idx ? 'active': ''}`} onClick={() => onClickItem(idx)}>
              <div className="bg-img"></div>
              <img className="img" src={context(`./avatars_${idx+1}.png`)} alt="" /> 
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Dongxiao;