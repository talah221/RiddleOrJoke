import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import lightTheme from './light.theme';

const theme = createMuiTheme(lightTheme);

export default ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);