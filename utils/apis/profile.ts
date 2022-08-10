import { ProfileDetail, ProfileList } from "@/types/model";
import { CATEGORY } from "@/types/type";
import { unauthInstance, authInstance } from "./instance";

export type OauthType = "GOOGLE" | "NAVER" | "KAKAO";
export type LoginPayload = { email: string; oauthType: OauthType };
export type ProfilesPayload = {
  username: string;
  categories: typeof CATEGORY[number][];
};

const profileAPI = {
  login: (payload: LoginPayload) =>
    unauthInstance.post<{ token: string }>("/login", payload),
  loginSuccess: () =>
    authInstance.get<{ hasProfile: boolean }>("/login/success"),
  logout: () => authInstance.post("/users/logout"),
  createProfile: (payload: ProfilesPayload) =>
    authInstance.post("/profiles", payload),
  getOtherProfile: (profileId: number) =>
    authInstance.get<ProfileDetail>(`/profiles/${profileId}`),
  getFollow: (profileId: number, tab: string, queryString: string) =>
    authInstance.get<ProfileList>(
      `/profiles/${profileId}/${tab}?${queryString}`
    ),
  getMyProfile: () => authInstance.get<ProfileDetail>("/profiles/me"),
  editProfile: (formData: FormData) =>
    authInstance({
      method: "put",
      url: "/profiles/me",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  getProfilesByUsername: (queryString: string) =>
    authInstance.get<ProfileList>(`/profiles?${queryString}`),
};

export default profileAPI;
