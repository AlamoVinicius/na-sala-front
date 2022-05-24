import React from "react";

import { Modal, Button } from "react-bootstrap";

const ModalCustom = ({ showModal, setShowModal, title, textBody, handleConfirmClick }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{textBody}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirmClick}>
          confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCustom;
