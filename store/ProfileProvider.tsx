import { getProfile } from "@/types/dummyData";
import { ProfileDetail } from "@/types/model";
import profileAPI from "@/utils/apis/profile";
import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  useEffect,
} from "react";

const initialUser = getProfile; // 더미data
type SampleDispatch = Dispatch<Action>;
type Action = { type: "GET_PROFILES"; profile: ProfileDetail };

export const ProfileContext = createContext<ProfileDetail | null>(null);
export const ProfileDispatchContext =
  createContext<SampleDispatch | null>(null);

export const useProfile = () => useContext(ProfileContext);

const ProfileReducer = (state: ProfileDetail, action: Action) => {
  switch (action.type) {
    case "GET_PROFILES":
      return { ...action.profile };
    default:
      throw new Error(`Unhanded action type`);
  }
};

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(ProfileReducer, initialUser);

  useEffect(() => {
    const setProfile = async () => {
      try {
        const { data } = await profileAPI.getMyProfile();
        dispatch({ type: "GET_PROFILES", profile: data });
      } catch (error) {
        console.error(error);
      }
    };
    setProfile();
  }, []);

  return (
    <ProfileContext.Provider value={state}>
      <ProfileDispatchContext.Provider value={dispatch}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
