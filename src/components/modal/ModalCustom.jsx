import React from "react";

import { Modal, Button, Spinner } from "react-bootstrap";

const ModalCustom = ({ showModal, setShowModal, title, textBody, handleConfirmClick, isLoading }) => {
  return (
    <Modal show={showModal} onHide={setShowModal} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{textBody}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirmClick} disabled={isLoading}>
          {isLoading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
          {isLoading ? "Carregando..." : "confirmar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const ModalComp = ({ showModal, setShowModal, title, children, handleConfirmClick }) => {
  return (
    <Modal show={showModal} onHide={setShowModal} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalCustom;
