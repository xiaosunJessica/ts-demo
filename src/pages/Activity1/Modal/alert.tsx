import * as React from "react";
import * as ReactDOM from "react-dom";
import Modal, { AlertProps } from "./Modal";

export default function alert(props: AlertProps) {
  const { content, onOk, onCancel, onClose, autoUnmount = true, ...rest } = props;
  let closed = false;

  if (!content) {
    // console.log('Must specify either an alert title, or message, or both');
    return {
      close: () => {},
    };
  }

  const div: HTMLDivElement = document.createElement("div");
  document.body.appendChild(div);

  function close() {
    if (autoUnmount) {
      window.removeEventListener("popstate", close);
    }
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  if (autoUnmount) {
    window.addEventListener("popstate", close);
  }

  const onAlertCancel = () => {
    if (closed) {
      return;
    }
    const cancel = onCancel || (() => {});
    const res = cancel();
    if (res && res.then) {
      res
        .then(() => {
          closed = true;
          close();
        })
        .catch(() => {});
    } else {
      closed = true;
      close();
    }
  };

  const onAlertClose = () => {
    if (closed) {
      return;
    }
    const cancel = onClose || onCancel || (() => {});
    const res = cancel();
    if (res && res.then) {
      res
        .then(() => {
          closed = true;
          close();
        })
        .catch(() => {});
    } else {
      closed = true;
      close();
    }
  };

  const onConfirm = () => {
    if (closed) {
      return;
    }

    const confirm = onOk || (() => {});

    const res = confirm();
    if (res && res.then) {
      res
        .then(() => {
          closed = true;
          close();
        })
        .catch(() => {});
    } else {
      closed = true;
      close();
    }
  };

  ReactDOM.render(
    <Modal {...rest} visible onOk={onConfirm} onCancel={onAlertCancel} onClose={onAlertClose}>
      {content}
    </Modal>,
    div,
  );

  return {
    close,
  };
}
