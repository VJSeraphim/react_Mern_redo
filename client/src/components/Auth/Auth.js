import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Icon from './icon'
import useStyles from './styles'
import Input from './Input'
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';

const initState = { firstName: '', lastname:'', email: '', password:'' , confirmPassword: ''}

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [form, setForm] = useState(initState)
    const dispatch = useDispatch()
    const history = useHistory()

    const switchMode = () => {
        setForm(initState)
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignup) {
            dispatch(signup(form, history))
        } else {
            dispatch(signin(form, history))
        }
    }


    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token= res?.tokenId

        try {
            dispatch({type: AUTH, data: {result, token}})

            history.push('/')
        } catch (error) {
            console.log(error)
        }

    }

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Signin Failed")
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
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
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'SIGN UP' : 'SIGN IN' }
                    </Button>
                    <GoogleLogin 
                        clientId="187041250313-c795vd3ekr2qgo3lf2844arr7dqi39pv.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                GOOGLE SIGN IN
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> 
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Do you already have your account? Sign in.' : "Don't have your account yet? Sign Up."}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
