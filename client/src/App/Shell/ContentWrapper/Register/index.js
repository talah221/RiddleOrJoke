import React, { useState } from 'react';
import { FormControl, FormLabel, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const initialNewUserState = {
    username: '',
    password: '',
    mail: ''
};

export default () => {
    const [newUser, setNewUser] = useState(initialNewUserState);
    const classes = useStyles();

    const handleUsernameChange = ({ target: { value }}) => setNewUser(prevState => ({...prevState, username: value}));

    const handlePasswordChange = ({ target: { value }}) => setNewUser(prevState => ({...prevState, password: value}));

    const handleMailChange = ({ target: { value }}) => setNewUser(prevState => ({...prevState, mail: value}));

    const handleRegister = (e) => {
        e.preventDefault();

        console.log(newUser);
    };

    return (
        <FormControl component={'form'}
                     onSubmit={handleRegister}
                     className={classes.register}>
            <FormLabel className={classes.title}>
                <Typography variant={'h3'} color={'primary'}>הרשמה</Typography>
            </FormLabel>
            <TextField label={'שם משתמש'}
                       className={classes.textField}
                       InputLabelProps={{style: {right: '0', left: NaN}}} // common?
                       onChange={handleUsernameChange} />
            <TextField label={'סיסמה'}
                       type={'password'}
                       className={classes.textField}
                       InputLabelProps={{style: {right: '0'}}}
                       onChange={handlePasswordChange} />
            <TextField label={'סיסמה שוב'}
                       type={'password'}
                       className={classes.textField}
                       InputLabelProps={{style: {right: '0'}}}
                       onChange={handlePasswordChange} />
            <TextField label={'אימייל'}
                       className={classes.textField}
                       InputLabelProps={{style: {right: '0'}}}
                       onChange={handleMailChange} />
            <Button variant={'contained'}
                    color={'secondary'}
                    type={'submit'}
                        ullWidth>הרשם עכשיו!</Button>
        </FormControl>
    )
};

const useStyles = makeStyles({
    register: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        alignSelf: 'center'
    },
    textField: {
        marginBottom: '16px'
    }
});