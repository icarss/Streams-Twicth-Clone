import { formValues } from "redux-form";
import streams from "../apis/streams";
import {
  SIGN_OUT,
  SIGN_IN,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";
import history from "../components/history";

export const signIn = () => {
  return {
    type: SIGN_IN,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch) => {
  const res = await streams.post("/streams", formValues);

  dispatch({ type: CREATE_STREAM, payload: res.data });
  history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
  const res = await streams.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: res.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const res = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: res.data });
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};

export const editStream = (id, formValues) => async (dispatch) => {
  const res = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: res.data });
  history.push("/");
};
