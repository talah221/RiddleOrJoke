import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon } from '@material-ui/icons';

export default () => {
    const classes = useStyles();

    return (
        <Box className={classes.emptyResults}>
            <SentimentVeryDissatisfiedIcon />
            <Typography variant={'h6'}>לא נמצאו תוצאות</Typography>
        </Box>
    )
};

const useStyles = makeStyles({
   emptyResults: {
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center'
   }
});