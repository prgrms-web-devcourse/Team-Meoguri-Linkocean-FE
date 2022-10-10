import { AuthResponse } from "@/types/type";
import { authInstance, unauthInstance } from "./instance";

const authAPI = {
  auth: (code: string) =>
    unauthInstance.post<AuthResponse>("/auth/google", {
      code,
      redirectUri: window.location.origin,
    }),
  loginSuccess: () =>
    authInstance.get<{ hasProfile: boolean }>("/login/success"),
};

export default authAPI;
