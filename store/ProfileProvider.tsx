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
      tags: string[];
      categories: typeof CATEGORY[number] | "no-category";
    }
  | {
      type: "REMOVE_BOOKMARK";
      tags: string[];
    }
  | {
      type: "EDIT_BOOKMARK";
      newTags: string[];
      tags: string[];
      categories: typeof CATEGORY[number] | "no-category";
    };

const ProfileContext = createContext<ProfileDetail | null>(null);
const ProfileDispatchContext = createContext<SampleDispatch | null>(null);

const useProfile = () => useContext(ProfileContext);

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
      return {
        ...state,
        categories: setCategory(state.categories, categories),
        tags: setCreateTags(state.tags ? state.tags : [], tags),
      };
    }

    case "REMOVE_BOOKMARK": {
      const { tags } = action;
      return {
        ...state,
        tags: setRemoveTags(state.tags ? state.tags : [], tags),
      };
    }

    case "EDIT_BOOKMARK": {
      const { newTags, tags, categories } = action;
      return {
        ...state,
        tags: setCreateTags(
          setRemoveTags(state.tags ? state.tags : [], tags),
          newTags
        ),
        categories: setCategory(state.categories, categories),
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

const setRemoveTags = (currentTags: TagType[], removeTags: string[]) => {
  const setTags = currentTags ? [...currentTags] : [];
  currentTags?.forEach(({ tag, count }, i) => {
    removeTags.forEach((removeTag) => {
      if (removeTag === tag) {
        setTags[i] = { tag, count: count - 1 };
      }
    });
  });
  return setTags.filter(({ count }) => count > 0);
};

const setCreateTags = (currentTags: TagType[], newTags: string[]) => {
  let setTags = [...currentTags];

  newTags.forEach((newTag) => {
    const isExistTag = currentTags?.some((tag) => tag.tag === newTag);
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
  return setTags;
};

const setCategory = (
  currentCategory: typeof CATEGORY[number][],
  newCategory: typeof CATEGORY[number] | "no-category"
) => {
  let setCategories = currentCategory ? [...currentCategory] : [];

  if (newCategory === "no-category" || currentCategory?.includes(newCategory)) {
    setCategories = [...currentCategory];
  } else {
    setCategories = [...currentCategory, newCategory];
  }

  return setCategories;
};

export { ProfileContext, ProfileDispatchContext, useProfile };
export default ProfileProvider;
