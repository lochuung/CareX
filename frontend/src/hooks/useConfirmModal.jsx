import React, { useEffect, useState } from "react";
import { Button, Modal, Space } from "antd";
const ConfirmModal = ({ success, title, content, open, setOpen }) => {
  const handleOk = () => {
    setOpen(false);
    success();
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            Modal.confirm({
              title: title,
              content: content,
              footer: (_, { OkBtn, CancelBtn }) => (
                <>
                  <Button></Button>
                  <CancelBtn />
                  <OkBtn />
                </>
              ),
            });
          }}
        ></Button>
      </Space>
      <Modal
        open={open}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <p>{content}</p>
      </Modal>
    </>
  );
};
export default ConfirmModal;
