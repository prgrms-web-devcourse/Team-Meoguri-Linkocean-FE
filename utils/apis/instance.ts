/* eslint-disable no-param-reassign */
import axios from "axios";
import storage from "@/utils/localStorage";

const baseURL = `${process.env.END_POINT}/api/v1`;

const unauthInstance = axios.create({ baseURL });

const authInstance = axios.create({ baseURL });
authInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${storage.getItem("LINKOCEAN_TOKEN", "")}`,
    };
  },
  (error) => Promise.reject(error)
);

export { unauthInstance, authInstance };
