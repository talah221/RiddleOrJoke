import React, { useState } from 'react';
import {
    Box, Button,
    Card,
    CardContent, Collapse,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup, TextField,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon } from "@material-ui/icons";

import AddButton from './AddButton';
import { useSnackbar } from '../../../../providers/SnackbarProvider';
import validateNewItem from './new-item.validator';
import useRiddleApi from '../../../../hooks/useRiddleApi';
import useJokeApi from '../../../../hooks/useJokeApi';

const initialNewItemState = {
    type: '',
    content: '',
    answers: [],
    explanation: ''
};

export default ({ refetch }) => {
    const [newItem, setNewItem] = useState(initialNewItemState);
    const [newItemToggled, setNewItemToggled] = useState(false);
    const { showSnackbar } = useSnackbar();
    const classes = useStyles();
    const { create: createRiddle } = useRiddleApi();
    const { create: createJoke } = useJokeApi();

    const initNewItem = () => setNewItem(initialNewItemState);

    const toggleNewItem = () => setNewItemToggled(!newItemToggled);

    const handleTypeChange = ({ target: { value } }) => setNewItem(prevState => ({ ...prevState, type: value }));

    const handleContentChange = ({ target: { value } }) => setNewItem(prevState => ({ ...prevState, content: value }));

    const handleAnswerCorrectnessChange = ({ target: { value } }) => {
        let { answers } = newItem;

        answers = answers.map(x => ({ ...x, isCorrect: x.value === value }));

        setNewItem(prevState => ({ ...prevState, answers }));
    };

    const handleAnswerValueChange = ({ target: { value } }, i) => {
        let { answers } = newItem;

        answers[i].value = value;
        answers[i].isCorrect = true;

        setNewItem(prevState => ({ ...prevState, answers }));
    };

    const handleExplanationChange = ({ target: { value } }) => setNewItem(prevState => ({ ...prevState, explanation: value }));

    const handleAddAnswer = () => {
        const answer = {
            value: `תשובה ${newItem.answers.length + 1}`,
            isCorrect: false
        };

        // refactor --> check if can combine
        const { answers } = newItem;

        answers.push(answer);

        setNewItem(prevState => ({ ...prevState, answers }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        newItem.createdAt= Date.now()
        try {
            await validateNewItem(newItem);

            const { data: item } =
                newItem.type === 'riddle' ?
                    await createRiddle(newItem) :
                    await createJoke(newItem);

            toggleNewItem();
            initNewItem();
            refetch();
        }
        catch (e) {
            showSnackbar(e);
        }
    };

    const getCorrectAnswer = () => newItem.answers.find(x => x.isCorrect)?.value; // throws error

    return (
        <>
            <Collapse in={newItemToggled}>
                <Card>
                    <CardContent>
                        <FormControl
                            component='form'
                            onSubmit={handleCreate}
                            className={classes.newItemForm}>
                            <FormLabel>
                                <Typography variant={'h5'} color={'primary'}>הוספת חידה / בדיחה</Typography>
                            </FormLabel>
                            <RadioGroup
                                onChange={handleTypeChange}
                                value={newItem.type}
                                className={classes.type}>
                                <FormControlLabel
                                    control={<Radio />}
                                    value='riddle'
                                    label='חידה' />
                                <FormControlLabel
                                    control={<Radio />}
                                    value='joke'
                                    label='בדיחה' />
                            </RadioGroup>
                            <TextField
                                multiline
                                rows={4}
                                variant='outlined'
                                onChange={handleContentChange}
                                value={newItem.content} />
                            <Box className={classes.answers}>
                                <Collapse in={newItem.type === 'riddle'}>
                                    <FormLabel color={'primary'}>הזן תשובות אפשריות ובחר את הנכונה</FormLabel>
                                    <RadioGroup onChange={handleAnswerCorrectnessChange} value={getCorrectAnswer()}>
                                        {newItem.answers.map((x, i) => (
                                            <FormControlLabel
                                                control={<Radio />}
                                                label={<TextField value={x.value} onChange={e => handleAnswerValueChange(e, i)} />}
                                                value={x.value} key={i} />
                                        ))}
                                    </RadioGroup>
                                    {newItem.answers.length < 4 && (
                                        <Button onClick={handleAddAnswer}>
                                            <AddIcon />
                                        </Button>
                                    )}
                                </Collapse>
                            </Box>
                            {newItem.type === 'riddle' && (
                                <TextField label={'הסבר'}
                                    variant={'outlined'}
                                    onChange={handleExplanationChange}
                                    InputLabelProps={{ style: { right: '3%' } }}
                                    value={newItem.explanation} />
                            )}
                            <Button fullWidth
                                type='submit'
                                variant='contained'
                                color='secondary'>צור חדש</Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Collapse>

            <AddButton toggleNewItem={toggleNewItem} />
        </>
    );
};

const useStyles = makeStyles({
    newItemForm: {
        width: '100%'
    },
    type: {
        flexDirection: 'row',
        marginRight: '-16px'
    },
    answers: {
        margin: '16px 0 16px'
    }
});