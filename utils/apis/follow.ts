import { authInstance } from "./instance";

const followAPI = {
  createFollow: (followeeId: number) =>
    authInstance.post(`/profiles/follow?followeeId=${followeeId}`),
  deleteFollow: (followeeId: number) =>
    authInstance.post(`/profiles/unfollow?followeeId=${followeeId}`),
};

export default followAPI;
