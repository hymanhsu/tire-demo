"use client";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function ConfirmDialog({title, content, show, handleClose, handleSure}) {

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSure}>
            Okey
          </Button>
        </Modal.Footer>
      </Modal>
    );

}

