import React, { useState } from 'react';
import { Box, CardActions } from '@material-ui/core';
import {
    Favorite as FavoriteIcon,
    ReportProblem as ReportProblemIcon,
    Share as ShareIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {FacebookShareButton,EmailShareButton} from 'react-share'
import IconButton from '../../../../../components/IconButton';
import ReportDialog from './ReportDialog';
import useRiddleApi from '../../../../../hooks/useRiddleApi';
import useJokeApi from '../../../../../hooks/useJokeApi';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';

export default ({ item }) => {
    const [reportDialogOpened, setReportDialogOpened] = useState(false);
    const classes = useStyles();
    const { like: likeRiddle } = useRiddleApi();
    const { like: likeJoke } = useJokeApi();
    const [isLiked, setLiked] = useState(false)
    var [likes, setLikes] = useState(item.likes)
    const handleLike = async () => {
        setLiked(!isLiked)
        if (!isLiked) setLikes(++likes)
        if (isLiked) setLikes(--likes)
        console.log('curr likes:', likes);

        if (item.type === 'riddle') {
            return await likeRiddle({ ...item, likes: likes });
        }

        await likeJoke({ ...item, likes: likes });
    };

    const openReportDialog = () => setReportDialogOpened(true);

    const closeReportDialog = () => setReportDialogOpened(false);

function shareToEmail(){
window.open(`mailto:?&subject=תראה איזו בדיחה מצחיקה!&body=אתר חדש לחידות ובדיחות קורעות! בוא נראה אותך כותב אחת! תסתכל על זאת: ${item.content},  http://www.youriddleisrael.co.il`)
}
function shareToFacebook(){
    window.open(`https://www.facebook.com/sharer/sharer.php?
    u=http://www.youriddleisrael.co.il&
    quote=אתר חדש לחידות ובדיחות קורעות! בוא נראה אותך כותב אחת! תסתכל על זאת: ${item.content}` )
}
    return (
        <CardActions className={classes.actions}>
            <Box>
                {/* <IconButton
                    title='שיתוף'
                    icon={<ShareIcon />}
                /> */}
                <IconButton
                    title='אהבתי'
                    icon={!isLiked ? <FavoriteBorderIcon /> : <FavoriteIcon style={{ color: 'red' }} />}
                    onClick={handleLike}
                />
                <span>{likes}</span>
                <IconButton
                    title='דיווח'
                    icon={<ReportProblemIcon />}
                    onClick={openReportDialog}
                />
                <IconButton
                    title="שיתוף בפייסבוק"
                    icon={<FacebookIcon style={{ color: '#115293' }} />}
                    onClick={shareToFacebook} 
                    />
                <IconButton
                    title="שיתוף במייל"
                    icon={<EmailIcon />}
                    onClick={shareToEmail}
                     />
            </Box>
            {/* <MyCmp/> */}
            <ReportDialog open={reportDialogOpened} closeDialog={closeReportDialog} />

        </CardActions>
    );
};

const useStyles = makeStyles({
    actions: {
        justifyContent: 'space-between',
        borderTop: '1px solid #e2e2e2' // theme!!!!
    }
});