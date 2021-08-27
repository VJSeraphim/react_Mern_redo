import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Button, Toolbar, Avatar } from '@material-ui/core'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import useStyles from './styles'
import memoriesLogo from '../../images/memoriesLogo.jpg'
import memoriesText from '../../images/memoriesText.png'

const Navbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const logout = () => {
        dispatch({ type: 'LOGOUT'})
        history.push('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar position="static" color="inherit" className={classes.appBar}>
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="45px"/>
                <img src={memoriesLogo} alt="icon" height="40px" className={classes.image}/>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                     <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                        {user.result.name}
                        </Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
                            LOGOUT
                        </Button>
                     </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">
                        SIGN IN
                    </Button>
                )}
            </Toolbar>
         </AppBar>
    )
}

export default Navbar
