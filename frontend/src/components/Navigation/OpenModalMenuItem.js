// frontend/src/components/Navigation/OpenModalMenuItem.js
import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal
  onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onItemClick) onItemClick();
  };

  return (
    <div
      className="login-n-signout"
      style={{ cursor: "pointer", padding: "3px" }}
    >
      <button className="login-n-signout-button" onClick={onClick}>
        {itemText}
      </button>
    </div>
  );
}

export default OpenModalMenuItem;
