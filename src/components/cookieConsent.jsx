'use client'

import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function CookieConsentBar({ cookieConsent }) {
    const [isCookieSet, setCookie] = useState(cookieConsent);

    // Function to handle accepting cookies
    const handleAcceptCookies = (event) => {
        event.preventDefault();
        fetch(`/w/api/setCookie`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                key: "cookieConsent",
                value: "true",
            }),
        })
            .then((response) => response.json())
            .then((resp) => {
                if (resp.meta.status == true) {
                    setCookie(true);
                }
            });
    };

    // Function to handle rejecting cookies
    const handleRejectCookies = (event) => {
        event.preventDefault();
        fetch(`/w/api/setCookie`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                key: "cookieConsent",
                value: "",
            }),
        })
            .then((response) => response.json())
            .then((resp) => {
                if (resp.meta.status == true) {
                    setCookie(false);
                }
            });
    };

    return (
        <>
            <Alert show={!isCookieSet} variant="success">
                <Alert.Heading></Alert.Heading>
                <p>
                    This website uses cookies to improve your experience. Do you accept cookies?
                </p>
                <hr />
                <div className="justify-content-end">
                    <Button onClick={handleAcceptCookies} variant="outline-success">
                        Accept
                    </Button>{' '}
                    <Button onClick={handleRejectCookies} variant="outline-success">
                        Reject
                    </Button>
                </div>
            </Alert>
        </>

    );
}

export default CookieConsentBar;

