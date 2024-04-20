import { useState } from "react";

const useModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const onOpen = () => {
    setOpenModal(true);
  };

  const onClose = () => {
    setOpenModal(false);
  };

  return { openModal, onOpen, onClose };
};

export default useModal;
