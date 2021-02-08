import React from 'react';
import { Avatar } from "@material-ui/core";
import { uniq } from 'lodash';

export const getAvatar = ({fullName, profileImage}) => {
    const text = fullName.split(" ").map(x => x.charAt(0)).join("");

    return (
        <Avatar src={profileImage}>
            {text}
        </Avatar>
    );
};

export const hasDuplications = (arr) => arr.length !== uniq(arr).length;