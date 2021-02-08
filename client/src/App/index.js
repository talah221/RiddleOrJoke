import React from 'react';
import { CssBaseline } from "@material-ui/core";
import AppBar from './Shell/AppBar';
import ContentWrapper from './Shell/ContentWrapper';

import AppProviders from './providers';

export default () => {
    return (
        <AppProviders>
            <CssBaseline>
                <AppBar />
                <ContentWrapper />
            </CssBaseline>
        </AppProviders>
    );
};