import { signOut } from "next-auth/react";
import { MouseEvent } from "react";
import storage from "./localStorage";
import { LINKOCEAN_PATH, STORAGE_KEY } from "./constants";

// eslint-disable-next-line import/prefer-default-export
export const handleLogout = <T>(e?: MouseEvent<T>) => {
  if (e?.preventDefault) {
    e.preventDefault();
  }

  storage.removeItem(STORAGE_KEY.oauthType);
  storage.removeItem(STORAGE_KEY.token);

  signOut({ callbackUrl: LINKOCEAN_PATH.login });
};
