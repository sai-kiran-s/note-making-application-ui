import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'
import { signUpHandler } from './userReducer';



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
  const [username, setUsername] = useState()
  const [userpassword, setPassword] = useState()
  const [fname, setFirstName] = useState()
  const [lname, setLastName] = useState()
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create a new account
        </Typography>
        <Grid container>
          <Grid xs style={{ marginRight: "1%" }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="firstName"
              label="First Name"
              type="name"
              id="firstName"
              value={fname}
              onChange={(e) => { setFirstName(e.target.value) }}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="lastName"
              label="Last Name"
              type="name"
              id="lastName"
              value={lname}
              onChange={(e) => { setLastName(e.target.value) }}
            />
          </Grid>
        </Grid>
        <div>
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
            onChange={(e) => { setUsername(e.target.value) }}
          />
           <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={userpassword}
          onChange={(e) => { setPassword(e.target.value) }}
        />
        </div>

       
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => { console.log(username, userpassword); var userDetails = { username, userpassword, fname, lname }; props.signUpHandler(userDetails) }}
        >
          Sign Up
          </Button>

      </div>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return { text: state.text }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUpHandler: (userDetails) => { dispatch(signUpHandler(userDetails)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);