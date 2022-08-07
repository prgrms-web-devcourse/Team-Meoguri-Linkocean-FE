import { useContext } from "react";
import {
  ProfileContext,
  ProfileDispatchContext,
} from "@/store/ProfileProvider";

export function useProfileState() {
  const state = useContext(ProfileContext);
  if (!state) {
    throw new Error("Cannot find UsersProvider");
  }
  return state;
}

export function useProfileDispatch() {
  const dispatch = useContext(ProfileDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find UsersProvider");
  }
  return dispatch;
}
