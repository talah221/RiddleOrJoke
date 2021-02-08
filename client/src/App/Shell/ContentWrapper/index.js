import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ItemsList from './ItemsList';
import Register from './Register'; // TODO

export default () => {
    const classes = useStyles();

    return (
        <Container maxWidth={'md'} className={classes.contentWrapper}>
            <ItemsList />
        </Container>
    );
};

const useStyles = makeStyles({
    contentWrapper: {
        marginTop: '90px'
    }
});