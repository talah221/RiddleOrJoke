import React from 'react';
import { Card } from '@material-ui/core';

import ItemContent from './ItemContent';
import ItemActions from './ItemActions';

export default ({ item }) => {
    return (
        <Card>
            <ItemContent item={item} />
            <ItemActions item={item} />
        </Card>
    );
};

