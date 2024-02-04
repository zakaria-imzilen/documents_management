import { Modal } from "antd";
import { Dispatch, ReactNode, SetStateAction, useCallback } from "react";

interface IProps {
  isOpen: { status: boolean; content: ReactNode };
  setIsOpen: Dispatch<
    SetStateAction<
      { status: false; content: null } | { status: true; content: ReactNode }
    >
  >;
  children: ReactNode;
}

const CustomModal = ({ isOpen, setIsOpen, children }: IProps) => {
  const handleClose = useCallback(
    () => setIsOpen({ status: false, content: null }),
    []
  );

  return (
    <Modal
      style={{ backgroundColor: "black" }}
      title="Preview file"
      centered
      open={isOpen.status}
      onOk={handleClose}
      onCancel={handleClose}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
