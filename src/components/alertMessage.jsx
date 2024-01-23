"use client";

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export function AlertMessage({title, content, show, handleClose}) {

    return (
      <Alert variant="warning" show={show} onClose={handleClose} dismissible>
        <Alert.Heading>{title}</Alert.Heading>
        <p>
        {content}
        </p>
      </Alert>
    );

}

