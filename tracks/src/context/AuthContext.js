import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../helper/navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    case "SIGNIN":
      return { token: action.payload, errorMessage: "" };
    case "CLEAR_ERROR_MESSAGE":
      return { ...state, errorMessage: "" };
    case "SIGNOUT":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    dispatch({ type: "SIGNIN", payload: token });
    navigate("TrackList");
  } else {
    navigate("Signup");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};

const signup = (dispatch) => async ({ email, password }) => {
  // make api request to signup with that email and password
  try {
    const response = await trackerApi.post("/user/signup", {
      email,
      password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("email", response.data.email);
    // if we sign up , modify state and say that we are auth (jwt)
    dispatch({ type: "SIGNIN", payload: response.data.token });

    navigate("TrackList");
  } catch (error) {
    console.log(error.message);
    // if signin fails => error message
    dispatch({
      type: "ADD_ERROR",
      payload: "Qualcosa è andato storto durante la registrazione!",
    });
    //   console.log(error.response.data);
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  // try to signin
  try {
    // handle success by update state
    // handle failure => error message
    const response = await trackerApi.post("/user/signin", {
      email,
      password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("email", response.data.email);
    dispatch({ type: "SIGNIN", payload: response.data.token });

    navigate("TrackList");
  } catch (error) {
    // if signin fails => error message
    console.log(error.message);
    dispatch({
      type: "ADD_ERROR",
      payload: "Qualcosa è andato storto durante l'accesso",
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("email");
  dispatch({ type: "SIGNOUT" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
