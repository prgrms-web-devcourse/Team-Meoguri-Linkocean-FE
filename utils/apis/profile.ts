import { ProfileDetail } from "@/types/model";
import { CATEGORY } from "@/types/type";
import { unauthInstance, authInstance } from "./instance";

export type OauthType = "GOOGLE" | "NAVER" | "KAKAO";
export type Login = { email: string; oauthType: OauthType };
export type Profiles = {
  username: string;
  categories: typeof CATEGORY[number][];
};

const profileAPI = {
  login: (payload: Login) =>
    unauthInstance.post<{ token: string }>("/login", payload),
  loginSuccess: () =>
    authInstance.get<{ hasProfile: boolean }>("/login/success"),
  profiles: (payload: Profiles) => authInstance.post("/profiles", payload),
  profilesMe: () => authInstance.get<ProfileDetail>("/profiles/me"),
};

export default profileAPI;
