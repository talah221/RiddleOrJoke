import React from 'react';

import ThemeProvider from './ThemeProvider';
import SnackbarProvider from './SnackbarProvider';

export default ({ children }) => (
    <ThemeProvider>
        <SnackbarProvider> 
            {children}
        </SnackbarProvider>
    </ThemeProvider>
);