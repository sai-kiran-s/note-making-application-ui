import axios from "axios";
export const GETNOTES_REQUEST = "GETNOTES_REQUEST";
export const GETNOTES_SUCCESS = "GETNOTES_SUCCESS";
export const GETNOTES_FAILURE = "GETNOTES_FAILURE";
export const LOGOUT = "LOGOUT";
// export const UPDATE
const getNotesRequest = () => {
  return {
    type: GETNOTES_REQUEST,
    //payload: userDetails,
  };
};

const getNotesSuccess = (text) => {
  return {
    type: GETNOTES_SUCCESS,
    payload: text,
  };
};

const getNotesFailure = (errorMessage) => {
  return {
    type: GETNOTES_FAILURE,
    payload: errorMessage,
  };
};

export const noteFetcher = () =>{
  return function (dispatch) {
    console.log("gettext request");
    dispatch(getNotesRequest());

    // console.log("gettext request");
    axios
      .get("http://localhost:3001/viewsavednotes").then((res) => {
        console.log("notes fetch success",res.data.notes);
        localStorage.getItem('notes',res.data.notes)
        dispatch(getNotesSuccess(res.data.notes));
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
}

export const noteCreation = (noteDetails) => {
  return function (dispatch) {
    console.log(noteDetails.notes);
    console.log("gettext request");
    

    // console.log("gettext request");
    axios
      .post("http://localhost:3001/note/createnote", {
        username:"saikiran",
        note: noteDetails.notes,
        notename:noteDetails.noteName
      })
      .then((res) => {
        console.log("note creation success");
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
  notes: localStorage.getItem('notes')?localStorage.getItem('notes'):[],
  isLoading: false
};

export const notesReducer = (state = initState, action) => {
  switch (action.type) {
    case GETNOTES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GETNOTES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notes: [...action.payload]
      };
    case GETNOTES_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        alertMsg: action.payload,
      };

    default:
      return state;
  }
};
export default notesReducer;
