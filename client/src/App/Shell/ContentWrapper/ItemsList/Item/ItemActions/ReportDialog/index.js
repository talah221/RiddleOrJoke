import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions,
    Button, Select, MenuItem, TextField
} from '@material-ui/core';

export default ({ open, closeDialog }) => {
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');
    const classes = useStyles();

    const handleReasonChange = ({ target: { value }}) => setReason(value);

    const handleDescriptionChange = ({ target: { value }}) => setDescription(value);

    const clearSelections = () => { // todo: doesn't work
        setReason('');
        setDescription('');
    };

    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            onExited={clearSelections}
        >
            <DialogTitle>דיווח</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    אנא בחר את הסיבה לדיווח:
                </DialogContentText>
                <Select
                    className={classes.reason}
                    onChange={handleReasonChange}
                    value={reason}
                >
                    <MenuItem value={'שפה גסה'}>שפה גסה</MenuItem>
                    <MenuItem value={'גזענות'}>גזענות</MenuItem>
                    <MenuItem value={'העלבה'}>העלבה</MenuItem>
                    <MenuItem value={'אחר'}>אחר</MenuItem>
                </Select>
                {reason &&
                    <TextField
                        fullWidth
                        multiline
                        variant={'outlined'}
                        margin={'normal'}
                        rowsMax={3}
                        label={'פירוט'}
                        onChange={handleDescriptionChange}
                        value={description}
                    />
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>
                    סגור
                </Button>
                <Button onClick={closeDialog} color={'primary'}>
                    דווח
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles({
    reason: {
        width: '100%'
    }
});