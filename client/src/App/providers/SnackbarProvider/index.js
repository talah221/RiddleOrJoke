import React, { createContext, useContext, useState } from 'react';
import { Snackbar } from '@material-ui/core';

const SnackbarContext = createContext();

const initialMessage = 'No Message specified';

export default ({ children }) => {
    const [message, setMessage] = useState(initialMessage);
    const [isOpen, setIsOpen] = useState(false);

    const show = (message) => {
        setMessage(message.toString());
        setIsOpen(true);
    };

    const handleClose = () => setIsOpen(false);

    const handleExited = () => setMessage(initialMessage);

    return (
        <SnackbarContext.Provider value={{ showSnackbar: show }}>
            <Snackbar
                open={isOpen}
                message={message}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                autoHideDuration={6000}
                onClose={handleClose}
                onExited={handleExited}>
            </Snackbar>
            {children}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => useContext(SnackbarContext);