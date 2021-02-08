import React, { useState } from 'react';
import {
    CardContent,
    Accordion, AccordionDetails, AccordionSummary,
    Button,
    Collapse,
    FormControl, FormControlLabel, FormHelperText, FormLabel,
    Radio, RadioGroup,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import useRiddleApi from '../../../../../hooks/useRiddleApi';
import Comments from './Comments';
import useJokeApi from '../../../../../hooks/useJokeApi';

export default ({ item }) => {
    const [answersDisplayed, setAnswersDisplayed] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isSucc, setSucc] = useState(false)
    const [newCommentVal, setNewCommentVal] = useState('')
    const [name, setName] = useState('')
    const [isFalseMsg, setFalseMsg] = useState(false)
    const [answered, setAnswered] = useState(false);
    const [correctAnswered, setCorrectAnswered] = useState(false);
    const { verifyAnswer } = useRiddleApi();
    const { update: updateJoke } = useJokeApi();
    const { update: updateRiddle } = useRiddleApi();
    const [currItem, setCurrItem] = useState(item)
    const classes = useStyles();
    const toggleAnswersDisplayed = () => setAnswersDisplayed(!answersDisplayed);
    const handleAnswerChange = ({ target: { value } }) => setSelectedAnswer(value);
    const handleAnswer = async (e) => {
        e.preventDefault();

        const isAnswerCorrect = item.answers.find(ans => selectedAnswer === ans.value && ans.isCorrect)
        setSucc(false)
        setFalseMsg(false)
        setAnswered(true);

        if (isAnswerCorrect) {

            setCorrectAnswered(true);
            setSucc(true)
            // setTimeout(() => setSucc(false), 3000)

        } else {
            setCorrectAnswered(false);
            setFalseMsg(true)
            // setTimeout(() => setFalseMsg(false), 3000)

        }
    };
    function addComment() {
        const comment = { by: name, txt: newCommentVal }
        if (item.type === "riddle") {
            updateRiddle({ ...item, comments: [comment, ...item.comments] })
        }
        else if (item.type === 'joke') {
            updateJoke({ ...item, comments: [comment, ...item.comments] });
        }
        const newItem = { ...item, comments: [comment, ...item.comments] }
        setCurrItem(newItem)

    }
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSucc(false)
        setFalseMsg(false)
    }
    function handleNewComment(ev) {
        setNewCommentVal(ev)
    }
    function handleName(ev) {
        setName(ev)
    }



    return (
        <CardContent>
            <Snackbar open={isSucc} autoHideDuration={2500} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    תשובה נכונה!
        </Alert>
            </Snackbar>
            <Snackbar open={isFalseMsg} autoHideDuration={2500} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">

                    תשובה שגויה!
                      </Alert>
            </Snackbar>
            <Typography variant={'h5'} className={classes.content}>
                {item.content}
            </Typography>
            {item.type === 'riddle' &&
                <Button
                    color='secondary'
                    variant='contained'
                    onClick={toggleAnswersDisplayed}
                    className={classes.solveButton}>
                    {answersDisplayed ? 'הסתר את התשובות' : 'פתור את החידה!'}
                </Button>
            }
            <Collapse in={answersDisplayed}>
                <FormControl
                    component='form'
                    className={classes.answers}
                    onSubmit={handleAnswer}>
                    <FormLabel>
                        <Typography variant='h5' color='primary'>בואו נראה אתכם!</Typography>
                    </FormLabel>
                    <RadioGroup onChange={handleAnswerChange} value={selectedAnswer}>
                        {item.answers?.map((x, i) =>
                            <FormControlLabel
                                control={<Radio />}
                                value={x.value}
                                label={x.value}
                                className={classes.radio} key={i} />
                        )}
                    </RadioGroup>
                    <FormHelperText>
                        בחר את התשובה הנכונה
                    </FormHelperText>
                    <Button fullWidth
                        type='submit'
                        color='secondary'
                        variant='contained'
                        className={classes.answerButton}>ענה!</Button>
                </FormControl>
            </Collapse>
            { answered && correctAnswered && item.explanation && (
                <Accordion className={classes.solution}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant='body1'>
                            <strong>הצג פתרון</strong>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {item.explanation}
                    </AccordionDetails>
                </Accordion>
            )}
            <Comments comments={currItem.comments} commentHandler={(ev) => handleNewComment(ev)} nameHandler={(ev) => handleName(ev)} />
            <div className="mt10">
                <Button className="mt10" disabled={!name || !newCommentVal} onClick={addComment} size='small' variant="contained" color="primary" className="mt10">
                    הוספת תגובה
      </Button>
            </div>
        </CardContent>
    );
};

const useStyles = makeStyles({
    content: {
        marginBottom: '16px',
    },
    solveButton: {
        display: 'flex',
        margin: 'auto', // auto? flex??
        width: '40%',
        padding: '10px'
    },
    answers: {
        display: 'flex',
        margin: '16px auto 0', // auto? flex
        padding: '20px',
        background: '#fafafa', // theme
        width: '60%',
        borderRadius: '4px',
        alignItems: 'center'
    },
    radio: {
        margin: '0'
    },
    answerButton: {
        marginTop: '5px'
    },
    solution: {
        marginTop: '16px'
    },
});

