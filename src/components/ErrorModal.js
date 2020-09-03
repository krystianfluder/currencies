import React from "react";

import { Modal, Button } from "react-bootstrap";

const ErrorModal = ({ show, error, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Error message</Modal.Title>
      </Modal.Header>
      <Modal.Body>{error}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
