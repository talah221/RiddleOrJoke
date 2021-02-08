import React from 'react';
import { Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';

export default ({ toggleNewItem }) => {
    const classes = useStyles();

    return (
        <Fab color='secondary'
             className={classes.add}
             onClick={() => toggleNewItem()}>
            <AddIcon />
        </Fab>
    );
}

const useStyles = makeStyles({
    add: {
        position: 'fixed',
        bottom: '2%',
        left: '1%'
    }
});