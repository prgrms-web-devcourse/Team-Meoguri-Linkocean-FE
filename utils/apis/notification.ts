import { Notification } from "@/types/model";
import { authInstance } from "./instance";

const notificationAPI = {
  shareNotification: (targetId: number, bookmarkId: number) =>
    authInstance.post(`/bookmark/${bookmarkId}/share`, {
      targetId,
    }),
  getNotifications: (queryString: string) =>
    authInstance.get<{ notifications: Notification[] }>(
      `/notifications?${queryString}`
    ),
};

export default notificationAPI;
