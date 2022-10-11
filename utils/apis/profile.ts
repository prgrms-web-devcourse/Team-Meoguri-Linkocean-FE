import { ProfileDetail, ProfileList } from "@/types/model";
import { CATEGORY } from "@/types/type";
import { authInstance } from "./instance";

export type ProfilesPayload = {
  username: string;
  categories: typeof CATEGORY[number][];
};

const profileAPI = {
  createProfile: (payload: ProfilesPayload) =>
    authInstance.post<{ id: number }>("/profiles", payload),
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
