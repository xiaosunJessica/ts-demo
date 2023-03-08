import React from "react";
import cn from "classnames";
import { Button } from "antd-mobile";
import Mask from "./Mask";
import "./modal.less";
import icon_close from "../../images/close_2.png";
export interface ButtonProps {
  type?:
    | "primary"
    | "warning"
    | "ghost"
    | "red"
    | "green"
    | "orange"
    | "red-ghost"
    | "green-ghost"
    | "orange-ghost";
  size?: "large" | "small";
  disabled?: boolean;
  loading?: boolean;
  className?: any;
}

export interface ModalProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
  okText?: string;
  maskClosable?: boolean;
  cancelText?: string;
  onOk?: () => any;
  onCancel?: () => any;
  onClose?: () => void;
  showClose?: boolean;
  showCancel?: boolean;
  visible: boolean;
  width?: string;
  // 自行渲染footer
  renderFooter?: () => React.ReactNode;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

export interface AlertProps extends Partial<ModalProps> {
  autoUnmount?: boolean; // 页面后退时，是否自动卸载弹窗
}

export default class CgModal extends React.Component<ModalProps, {}> {
  static alert: (option: AlertProps) => { close: () => void };

  static Mask = Mask;

  constructor(props: ModalProps) {
    super(props);
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    if (typeof onCancel === "function") {
      onCancel();
    }
  };

  handleClose = () => {
    const { onClose, onCancel } = this.props;
    if (typeof onClose === "function") {
      onClose();
    } else if (typeof onCancel === "function") {
      onCancel();
    }
  };

  handleConfirm = () => {
    const { onOk } = this.props;
    if (typeof onOk === "function") {
      onOk();
    }
  };

  render() {
    const {
      children,
      className,
      content,
      title,
      showClose = true,
      maskClosable,
      okText = "确认",
      cancelText = "取消",
      visible,
      showCancel = true,
      renderFooter,
      onCancel,
      width = "3.15rem",
      okButtonProps = {},
      cancelButtonProps = {},
    } = this.props;
    return (
      <Mask visible={visible} maskClosable={maskClosable} onCancel={onCancel} className={className}>
        <div className="bx-modal-wrap">
          <div style={{ width }} className="bx-modal-content-wrap">
            {showClose && (
              <img onClick={this.handleClose} className="bx-modal-close" src={icon_close} alt="" />
            )}
            {title && <div className="bx-modal-title medium">{title}</div>}
            <div className="bx-modal-content">{content || children}</div>
            {renderFooter || (
              <div className={cn("bx-modal-footer", showCancel ? "bx-modal-show-cancel" : "")}>
                {showCancel && (
                  <Button
                    onClick={this.handleCancel}
                    className={`bx-modal-btn border-type bx-modal-cancel-btn ${cancelButtonProps.className}`}
                  >
                    {cancelText}
                  </Button>
                )}
                <Button
                  onClick={this.handleConfirm}
                  className={`bx-modal-btn ${okButtonProps.className}`}
                >
                  {okText}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Mask>
    );
  }
}
