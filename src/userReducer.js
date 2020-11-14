import axios from "axios";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
// export const UPDATE
const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS,
    payload: token,
  };
};

const loginFailure = (errorMessage) => {
  return {
    type: LOGIN_FAILURE,
    payload: errorMessage,
  };
};

export const loginHandler = (userDetails) => {
  return function (dispatch) {
    dispatch(loginRequest());

    console.log("login request");
    axios
      .post("http://localhost:3001/login", {
        username: userDetails.username,
        userpassword: userDetails.userpassword
      })
      .then((res) => {
        console.log("login success", res.data.token);
        localStorage.setItem('token', res.data.token);
        dispatch(loginSuccess(res.data.token));
      })
      .catch((err) => {
        if (err.response) {
          console.log("login failure");
          console.log(err.response.data.message);
          
          dispatch(loginFailure(err.response.data.message));
        } else {
          console.log("not connected to internet");
          dispatch(loginFailure("not connected to internet"));
        }
      })
      .finally(() => {
        console.log("stop loading");
      });
  };
};

export const signUpHandler = (userDetails) => {
  return function (dispatch) {
    dispatch(loginRequest());

    console.log("signup request");
    axios
      .post("http://localhost:3001/signup", {
        username: userDetails.username,
        userpassword: userDetails.userpassword,
        fname: userDetails.fname,
        lname: userDetails.lname
      })
      .then((res) => {
        console.log("signup success", res.data.token);
        localStorage.setItem('token', res.data.token)
        dispatch(loginSuccess(res.data.token));
      })
      .catch((err) => {
        if (err.response) {
          console.log("signup failure");
          console.log(err.response.data.message);
          dispatch(loginFailure(err.response.data.message));
        } else {
          console.log("not connected to internet");
          dispatch(loginFailure("not connected to internet"));
        }
      })
      .finally(() => {
        console.log("stop loading");
      });
  };
};


export const logoutHandler = () => {
  return {
    type: LOGOUT,
  };
};

const initState = {
  isLoading: false,
  loggedIn: false,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  alertMsg: "",
};

export const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      console.log("state changed");
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case LOGIN_SUCCESS:
      window.location.replace("/");
      return {
        ...state,
        isLoading: false,
        loggedIn: true,
        token: action.payload,
      };
    case LOGIN_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        alertMsg: action.payload,
      };
    case LOGOUT:
      localStorage.clear();
      window.location.replace("/");
      return {
        ...state,
        token: null,
        isLoading: false,
        loggedIn: false,
      };

    default:
      return state;
  }
};

export default loginReducer;