import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux'
import { loginHandler, logoutHandler } from './userReducer';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const [username,setUsername] = useState()
  const [userpassword,setuserpassword] = useState()
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange = {(e)=>{setUsername(e.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="userpassword"
            label="Password"
            type="userpassword"
            id="userpassword"
            autoComplete="current-password"
            value={userpassword}
            onChange = {(e)=>{setuserpassword(e.target.value)}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>{console.log(username,userpassword);var userDetails = {username,userpassword};props.loginHandler(userDetails)}}
          >
            Sign In
          </Button>
          <Grid container>
            
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
      </div>
    </Container>
  );
}
const mapStateToProps = (state) =>{
  return {text:state.text}
}

const mapDispatchToProps = (dispatch) =>{
  return{
    loginHandler:(userDetails)=>{ dispatch(loginHandler(userDetails))},
    logoutHandler:()=>{dispatch(logoutHandler())},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);