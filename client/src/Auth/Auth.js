import React from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons'
import Input from './Input'

import useStyles from './styles'

const Auth = () => {
    const classes = useStyles()
    const isSignup = false

    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'SIGN UP' : 'SIGN IN'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type="password"/>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
