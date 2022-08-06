import axios from "axios";
import storage from "@/utils/localStorage";

const baseURL = `${process.env.END_POINT}/api/v1`;

const unauthInstance = axios.create({ baseURL });
const authInstance = axios.create({ baseURL });
authInstance.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      Authorization: `bearer ${storage.getItem("LINKOCEAN_TOKEN", "")}`,
    };

    return config;
  },
  (error) => Promise.reject(error)
);

export { unauthInstance, authInstance };
