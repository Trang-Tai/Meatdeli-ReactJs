import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';

function ConfirmModal({ title, isOpen, onCancel, onConfirm, ...props }) {
    return (
        <Modal title={title}
            open={isOpen}
            onCancel={onCancel}
            centered
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={onConfirm}>
                    Confirm
                </Button>,
            ]}
        >
            {}
        </Modal>
    )
}

export default ConfirmModal;