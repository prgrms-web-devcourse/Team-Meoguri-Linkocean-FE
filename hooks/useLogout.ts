import { MouseEvent } from "react";
import { useRouter } from "next/router";
import storage from "@/utils/localStorage";
import { LINKOCEAN_PATH, STORAGE_KEY } from "@/utils/constants";

const useLogout = <T>(e?: MouseEvent<T>) => {
  const router = useRouter();

  return () => {
    if (e?.preventDefault) {
      e.preventDefault();
    }

    storage.removeItem(STORAGE_KEY.token);
    storage.removeItem(STORAGE_KEY.refreshToken);
    router.push(LINKOCEAN_PATH.login);
  };
};

export default useLogout;
