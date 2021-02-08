import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';

export default ({ title, icon, color, onClick }) => {
    return (
        <Tooltip title={title}>
            <IconButton color={color} onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    );
};