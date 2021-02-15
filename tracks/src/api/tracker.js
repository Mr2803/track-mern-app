import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ngrok = "http://4cd69e16cf32.ngrok.io";

const instance = axios.create({
  baseURL: `${ngrok}/api`,
});

instance.interceptors.request.use(
  //function used for every req
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  //function used for error
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
