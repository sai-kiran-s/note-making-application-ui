import axios from "axios";
export const GETTEXT_REQUEST = "GETTEXT_REQUEST";
export const GETTEXT_SUCCESS = "GETTEXT_SUCCESS";
export const GETTEXT_FAILURE = "GETTEXT_FAILURE";
export const LOGOUT = "LOGOUT";
// export const UPDATE
const getTextRequest = () => {
  return {
    type: GETTEXT_REQUEST,
    //payload: userDetails,
  };
};

const getTextSuccess = (text) => {
  return {
    type: GETTEXT_SUCCESS,
    payload: text,
  };
};

const gettextFailure = (errorMessage) => {
  return {
    type: GETTEXT_FAILURE,
    payload: errorMessage,
  };
};

export const getText = (base64String) => {
  return function (dispatch) {
    console.log("gettext request");
    dispatch(getTextRequest());

    // console.log("gettext request");
    axios
      .post("http://localhost:3001/api/gettext", {
        audio: base64String
      })
      .then((res) => {
        console.log("getext success", res.data.transcription);
        localStorage.setItem('text', res.data.transcription)
        window.location.replace("/createnotes");
        dispatch(getTextSuccess(res.data.transcription));
      })

    // .catch((err) => {
    //   if (err.response) {
    //     console.log("login failure");
    //     console.log(err.response.data.message);
    //     dispatch(getextFailure(err.response.data.message));
    //   } else {
    //     console.log("not connected to internet");
    //     dispatch(gettextFailure("not connected to internet"));
    //   }
    // })
    // .finally(() => {
    //   console.log("stop loading");
    // });
  };
};


const initState = {
  isLoading: false,
  text: localStorage.getItem('text')
};

export const getTextReducer = (state = initState, action) => {
  switch (action.type) {
    case GETTEXT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GETTEXT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        text: action.payload
      };
    case GETTEXT_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        alertMsg: action.payload,
      };

    default:
      return state;
  }
};
export default getTextReducer;
