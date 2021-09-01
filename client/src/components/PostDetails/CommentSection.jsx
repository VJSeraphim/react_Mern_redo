import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import useStyles from './styles'
import { commentPost } from '../../actions/posts'

const CommentSection = ({ post }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))

    const handleClick = () => {
        const lastComment = `${user.result.name}: ${comment}`
        dispatch(commentPost(lastComment, post._id))
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div classNAme={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">
                        Comments
                    </Typography>
                    {comments.map((com, inx) => (
                        <Typography key={inx} gutterBottom variant="subtitle1">
                            Comment {inx}
                        </Typography>
                    ))}
                </div>
                <div style={{ width: '70%' }}>
                    <Typography gutterBottom variant="h6">
                        Write your comment here
                    </Typography>
                    <TextField 
                        fullWidth
                        rows={4}
                        variant="outlined"
                        label="Comment"
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{ marginTop: '10px'}} fullWidth disabled={!comment} variant="contained" onClick={handleClick} color="primary">
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CommentSection
