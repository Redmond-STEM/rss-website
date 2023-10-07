import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const NotFoundPage = (() => {
    return (
        <div>
            <h1>404 Page Not Found</h1>
            <br/>
            <Button href="/">Return to Home Page</Button>
        </div>
    );
})

export default NotFoundPage;