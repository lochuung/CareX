import React, { useState } from "react";
import { Button, Modal, Space } from "antd";
const ConfirmModal = ({ success, reject, title, content }) => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
    success();
  };
  const handleCancel = () => {
    setOpen(false);
    reject();
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
        title="Title"
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
