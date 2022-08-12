import { ProfileDetail } from "@/types/model";
import { CATEGORY, TagType } from "@/types/type";
import profileAPI from "@/utils/apis/profile";
import storage from "@/utils/localStorage";
import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  useEffect,
} from "react";

const initialUser: ProfileDetail = {} as ProfileDetail;
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
  | { type: "UN_FOLLOW" }
  | {
      type: "CREATE_BOOKMARK";
      tags?: string[];
      categories?: typeof CATEGORY[number];
    }
  | {
      type: "REMOVE_BOOKMARK";
      tags?: string[];
    }
  | {
      type: "EDIT_BOOKMARK";
      newTags?: string[];
      tags?: string[];
      categories?: typeof CATEGORY[number];
    };

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
        followeeCount: state.followeeCount + 1,
      };
    case "UN_FOLLOW": {
      if (state.followeeCount < 1) {
        return { ...state };
      }
      return {
        ...state,
        followeeCount: state.followeeCount - 1,
      };
    }
    case "CREATE_BOOKMARK": {
      const { tags, categories } = action;
      let setCategories = state.categories;
      let setTags = state.tags;

      if (categories) {
        if (state.categories?.includes(categories)) {
          setCategories = [...state.categories];
        } else {
          setCategories = [
            ...(state.categories as typeof CATEGORY[number][]),
            categories,
          ];
        }
      }

      if (tags) {
        tags.forEach((newTag) => {
          const isExistTag = state.tags?.some((tag) => tag.tag === newTag);
          if (isExistTag) {
            setTags = setTags?.map((tag) => {
              if (tag.tag === newTag) {
                return {
                  ...tag,
                  count: tag.count + 1,
                };
              }
              return tag;
            });
          } else {
            setTags = [...(setTags as TagType[]), { tag: newTag, count: 1 }];
          }
        });
      }
      return {
        ...state,
        categories: setCategories,
        tags: setTags,
      };
    }
    case "REMOVE_BOOKMARK": {
      const { tags } = action;
      const setTags = state.tags ? [...state.tags] : [];
      if (tags) {
        state.tags?.forEach(({ tag, count }, i) => {
          tags.forEach((removeTag) => {
            if (removeTag === tag) {
              setTags[i] = { tag, count: count - 1 };
            }
          });
        });
      }

      return {
        ...state,
        tags: setTags.filter(({ count }) => count > 0),
      };
    }
    case "EDIT_BOOKMARK": {
      const { newTags, tags, categories } = action;
      let setCategories = state.categories ? [...state.categories] : [];
      let setTags = state.tags ? [...state.tags] : [];

      if (tags) {
        state.tags?.forEach(({ tag, count }, i) => {
          tags.forEach((removeTag) => {
            if (removeTag === tag) {
              setTags[i] = { tag, count: count - 1 };
            }
          });
        });
      }

      // tags => 새로운태그
      // state.tags -> 기존태그
      if (newTags) {
        newTags.forEach((newTag) => {
          const isExistTag = setTags?.some((tag) => tag.tag === newTag);
          if (isExistTag) {
            setTags = setTags?.map((tag) => {
              if (tag.tag === newTag) {
                return {
                  ...tag,
                  count: tag.count + 1,
                };
              }
              return tag;
            });
          } else {
            setTags = [...setTags, { tag: newTag, count: 1 }];
          }
        });
      }

      if (categories) {
        if (state.categories?.includes(categories)) {
          setCategories = [...state.categories];
        } else {
          setCategories = [
            ...(state.categories as typeof CATEGORY[number][]),
            categories,
          ];
        }
      }

      return {
        ...state,
        tags: setTags.filter(({ count }) => count > 0),
        categories: setCategories,
      };
    }
    default:
      throw new Error(`Unhanded action type`);
  }
};

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(ProfileReducer, initialUser);
  const token = storage.getItem("LINKOCEAN_TOKEN", false);

  useEffect(() => {
    (async () => {
      try {
        if (token) {
          const { data } = await profileAPI.getMyProfile();
          dispatch({ type: "GET_PROFILES", profile: data });
        } else {
          dispatch({ type: "GET_PROFILES", profile: initialUser });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [token]);

  return (
    <ProfileContext.Provider value={state}>
      <ProfileDispatchContext.Provider value={dispatch}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
