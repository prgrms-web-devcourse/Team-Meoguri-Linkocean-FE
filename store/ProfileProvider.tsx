import { ProfileDetail } from "@/types/model";
import { CATEGORY } from "@/types/type";
import profileAPI from "@/utils/apis/profile";
import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  useEffect,
} from "react";

const initialUser: ProfileDetail = {
  profileId: 1,
  favoriteCategories: [],
  username: "",
  followerCount: 0,
  followeeCount: 0,
};
type SampleDispatch = Dispatch<Action>;
type Action =
  | { type: "GET_PROFILES"; profile: ProfileDetail }
  | {
      type: "EDIT_PROFILES";
      profile: {
        bio: string;
        username: string;
        imageUrl: string;
        favoriteCategories: typeof CATEGORY[number][];
      };
    }
  | { type: "FOLLOW" }
  | { type: "UN_FOLLOW" };

export const ProfileContext = createContext<ProfileDetail | null>(null);
export const ProfileDispatchContext =
  createContext<SampleDispatch | null>(null);

export const useProfile = () => useContext(ProfileContext);

const ProfileReducer = (state: ProfileDetail, action: Action) => {
  switch (action.type) {
    case "GET_PROFILES":
      return { ...action.profile };
    case "EDIT_PROFILES": {
      const { bio, username, imageUrl, favoriteCategories } = action.profile;
      return {
        ...state,
        bio,
        username,
        imageUrl,
        favoriteCategories,
      };
    }
    case "FOLLOW":
      return {
        ...state,
        followerCount: state.followeeCount + 1,
      };
    case "UN_FOLLOW": {
      if (state.followeeCount < 1) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        followerCount: state.followeeCount - 1,
      };
    }

    default:
      throw new Error(`Unhanded action type`);
  }
};

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(ProfileReducer, initialUser);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await profileAPI.getMyProfile();
        dispatch({ type: "GET_PROFILES", profile: data });
      } catch (error) {
        console.error(error);
      }
    })();
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
