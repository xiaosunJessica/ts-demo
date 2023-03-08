import React from "react";
import cn from "classnames";
import { createPortal } from "react-dom";
import "./mask.less";

export interface ModalMaskProps {
  className?: string;
  visible: boolean;
  maskClosable?: boolean; // 点击蒙层是否允许关闭
  onCancel?: () => void;
}

// 抽出遮罩层，可以快速组装个性化的Modal
export default class ModalMask extends React.PureComponent<ModalMaskProps, {}> {
  node: HTMLDivElement;
  constructor(props: ModalMaskProps) {
    super(props);
    // 用作传送的node节点，需要将Dom渲染为body的子元素，否则iOS下蒙层不能覆盖全屏
    this.node = document.createElement("div");
    document.body.appendChild(this.node);
  }

  componentWillUnmount() {
    document.body.removeChild(this.node);
  }

  onClickMask = () => {
    const { onCancel, maskClosable = false } = this.props;
    if (maskClosable && typeof onCancel === "function") {
      onCancel();
    }
  };

  render() {
    const { children, className, visible } = this.props;
    return createPortal(
      <div style={{ display: visible ? "block" : "none" }} className={cn("bx-modal", className)}>
        <div onClick={this.onClickMask} className="bx-modal-mask" />
        {children}
      </div>,
      this.node,
    );
  }
}
