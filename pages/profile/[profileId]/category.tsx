import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageLayout, Meta } from "@/components/common";
import OtherBookmark from "@/components/otherBookmark/otherBookmarkTemplate";
import profileAPI from "@/utils/apis/profile";
import { ProfileDetail } from "@/types/model";

const Category = () => {
  const router = useRouter();

  const [otherProfileInfo, setOtherProfileInfo] = useState<ProfileDetail>();

  const { profileId } = router.query;

  const getOtherProfileApi = (id: number) => {
    (async () => {
      try {
        const res = await profileAPI.getOtherProfile(id);
        setOtherProfileInfo(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  };

  useEffect(() => {
    if (typeof profileId === "string") {
      getOtherProfileApi(parseInt(profileId, 10));
    }
  }, [profileId]);

  return (
    <>
      <Meta
        title={`${otherProfileInfo ? otherProfileInfo.username : ""}`}
        description={`${
          otherProfileInfo ? otherProfileInfo.username : ""
        }의 북마크 모음`}
        og={{
          title: "다른 머구리의 북마크 | LinkOcean",
          description: "다른 머구리의 북마크 모음",
        }}
        robots="index, follow"
      />
      <PageLayout>
        <PageLayout.Article>
          {otherProfileInfo && (
            <OtherBookmark type="category" otherProfile={otherProfileInfo} />
          )}
        </PageLayout.Article>
      </PageLayout>
    </>
  );
};

export default Category;
