import getTextReducer from "./speechToTextReducer";
import notesReducer from "./notesReducer"
import userReducer from "./userReducer"

import { createStore, applyMiddleware } from 'redux'

import thunk from "redux-thunk";

export const store = createStore(userReducer, applyMiddleware(thunk));

