import { Notification } from "@/types/model";
import { authInstance } from "./instance";

export type ShareNotificationPayload = {
  targetId: number;
  bookmarkId: number;
};

const notificationAPI = {
  shareNotification: (payload: ShareNotificationPayload) =>
    authInstance.post("/notifications", payload),
  getNotifications: (queryString: string) =>
    authInstance.get<{ notifications: Notification[] }>(
      `/notifications?${queryString}`
    ),
};

export default notificationAPI;
