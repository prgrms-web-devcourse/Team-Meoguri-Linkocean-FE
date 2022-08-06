import { Reaction } from "@/types/type";
import { authInstance } from "./instance";

const reactionAPI = {
  createReaction: (bookmarkId: number, reactionType: Reaction) =>
    authInstance.post(`/bookmark/${bookmarkId}/reactions/${reactionType}`),
};

export default reactionAPI;
