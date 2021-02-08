import React  from 'react';
import { AppBar, Toolbar, Box } from "@material-ui/core";
import {
    Settings as SettingsIcon,
    Notifications as NotificationsIcon,
    Favorite as FavoriteIcon
} from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";

import IconButton from '../../components/IconButton';
import Logo from './logo.png';

export default () => {
    const classes = useStyles();

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Box m={1}>
                    <img src={Logo} alt={''} />
                </Box>
                <Box id="actions">
                    <IconButton
                        title={'התראות'}
                        color={'inherit'}
                        icon={<NotificationsIcon />}
                    />
                    <IconButton
                        title={'דברים שאהבתי'}
                        color={'inherit'}
                        icon={<FavoriteIcon />}
                    />
                    <IconButton
                        title={'הגדרות'}
                        color={'inherit'}
                        icon={<SettingsIcon />}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

const useStyles = makeStyles({
   toolbar: {
       justifyContent: "space-between"
   }
});