import { Divider, Input, OutlinedInput } from '@material-ui/core'
import React, { useState } from 'react'




export default function Comments({ comments, commentHandler, nameHandler, empty }) {
    const [comment, setComment] = useState('')
    const [name, setName] = useState('')
    function onCommentHandler(ev) {
        const { value } = ev.target
        setComment(value)
        commentHandler(value)
    }
    function onNameHandler(ev) {
        const { value } = ev.target
        setName(value)
        nameHandler(value)

    }
    if (!comments || !comments.length) return <div>

        <div className="mt10">
            <Input onChange={onNameHandler}  placeholder="הכנס שם" />
        </div>
        <div className="mt10">
            <OutlinedInput onChange={onCommentHandler}  placeholder="outlined" placeholder="הכנס תגובה כאן" margin='dense'
                multiline={true} required={true} />
        </div>

    </div>
    return (
        <section className="comments-container">
            <h2>תגובות:</h2>
            <Divider variant="inset" />
            <div>
                {comments.map((comment, idx) => {
                    return <React.Fragment key={idx}>
                        <h5 style={{ margin: 0, padding: 0 }}> כותב: {comment.by}</h5>
                        <h3 style={{ margin: 0, marginBottom: '15px', padding: 0 }}>טקסט: {comment.txt}</h3>
                        <Divider variant="inset" />
                    </React.Fragment>

                })}
                <div className="mt10">
                    <Input onChange={onNameHandler}  placeholder="הכנס שם" />
                </div>
                <div className="mt10">
                    <OutlinedInput onChange={onCommentHandler}  placeholder="outlined" placeholder="הכנס תגובה כאן" margin='dense'
                        multiline={true} required={true} />
                </div>

            </div>
        </section>
    )
}
