import axios from "axios";
import storage from "@/utils/localStorage";
import { STORAGE_KEY } from "@/utils/constants";
import { AuthResponse } from "@/types/type";
import useLogout from "@/hooks/useLogout";

const baseURL = `${process.env.END_POINT}/api/v1`;

const unauthInstance = axios.create({ baseURL });
const authInstance = axios.create({ baseURL });
authInstance.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers = {
    Authorization: `Bearer ${storage.getItem("LINKOCEAN_TOKEN", "")}`,
  };

  return config;
});
authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      try {
        const response = await unauthInstance.post<AuthResponse>(
          "/auth/token/refresh",
          {
            refreshToken: storage.getItem(STORAGE_KEY.refreshToken, null),
            tokenType: "Bearer",
          }
        );
        storage.setItem(STORAGE_KEY.token, response.data.accessToken);
        storage.setItem(STORAGE_KEY.refreshToken, response.data.refreshToken);

        return await authInstance.request(error.config);
      } catch (err) {
        useLogout()();
      }
    }

    return Promise.reject(error);
  }
);

export { unauthInstance, authInstance };
