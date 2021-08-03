import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'

import useStyles from './styles'

const Posts = () => {
    const posts = useSelector((state) => state.posts)
    const classes = useStyles()

    return (
        <div>
            <h1>Hi Posts</h1>
        </div>
    )
}

export default Posts
