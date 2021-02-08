import React, { useState, useEffect } from 'react';
import { Grid, Tabs, Tab } from '@material-ui/core';

import Item from './Item';
import NewItem from './NewItem';
import EmptyResults from '../../../components/EmptyResults';
import { useSnackbar } from '../../../providers/SnackbarProvider';
import useRiddleApi from '../../../hooks/useRiddleApi';
import useJokeApi from '../../../hooks/useJokeApi';

export default () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [riddles, setRiddles] = useState([]);
    const [jokes, setJokes] = useState([]);
    const [refetchKey, setRefetchKey] = useState(0);
    const { showSnackbar } = useSnackbar();
    const { getAll: getAllRiddles } = useRiddleApi();
    const { getAll: getAllJokes } = useJokeApi();

    const fetchRiddles = async () => {
        try {
            const riddles = await getAllRiddles();
            setRiddles([...riddles]);
        }
        catch (e) {
            showSnackbar(e);
        }
    };

    const fetchJokes = async () => {
        try {
            const jokes = await getAllJokes();
            setJokes([...jokes]);
        }
        catch (e) {
            showSnackbar(e);
        }
    };

    useEffect(() => {
        fetchRiddles();
        fetchJokes();
        const allItems = []
    }, [refetchKey]);

    const handleTabChange = (e, index) => setSelectedTabIndex(index);

    return (
        <>
            {/* <Tabs
                value={selectedTabIndex}
                onChange={handleTabChange}
                variant={'fullWidth'}
                indicatorColor={'primary'}
                textColor={'primary'}
            >
                <Tab label={'הכל'} />
                <Tab label={'חידות'} disabled={true} />
                <Tab label={'בדיחות'} disabled={true} />
            </Tabs> */}


            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <NewItem refetch={() => setRefetchKey(prevState => prevState + 1)} />
                </Grid>

                {[...riddles, ...jokes]?.length ?
                    [...riddles, ...jokes].sort((a, b) => b.createdAt - a.createdAt).map(x => {
                        return (
                            <Grid item xs={12} key={x._id}>
                                <Item item={x} />
                            </Grid>
                        )
                    }) : (
                        <Grid item xs={12}>
                            <EmptyResults />
                        </Grid>
                    )}
            </Grid>
        </>
    )
};