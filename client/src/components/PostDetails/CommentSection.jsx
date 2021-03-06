import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import useStyles from './styles'
import { commentPost } from '../../actions/posts'

const CommentSection = ({ post }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const user = JSON.parse(localStorage.getItem('profile'))
    const ref = useRef()

    const handleClick = async () => {
        const lastComment = `${user.result.name}: ${comment}`
        const newComments = await dispatch(commentPost(lastComment, post._id))

        setComments(newComments)
        setComment('')

        ref.current.scrollIntoView({ behavior: 'smooth'})
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">
                        Comments
                    </Typography>
                    {comments.map((com, inx) => (
                        <Typography key={inx} gutterBottom variant="subtitle1">
                            <strong>{com.split(': ')[0]}</strong>
                            {com.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={ref}/>
                </div>
                {user?.result?.name && (
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
                )}
            </div>
        </div>
    )
}

export default CommentSection
