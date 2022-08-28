import styled from "@emotion/styled";
import * as theme from "@/styles/theme";
import { MouseEvent, useEffect, useState } from "react";
import { FollowTabType } from "@/types/type";

const INITITAL_PROFILE = { followerCount: 0, followeeCount: 0 };
interface FollowTabListProps {
  profile?: {
    followerCount: number;
    followeeCount: number;
  };
  onClick: (tab: FollowTabType) => void;
  initialTab?: string;
}

const FollowTabList = ({
  profile = INITITAL_PROFILE,
  onClick,
  initialTab = "follower",
}: FollowTabListProps) => {
  const [tab, setTab] = useState(initialTab);

  const handleClick = (
    e: MouseEvent<HTMLAnchorElement>,
    type: FollowTabType
  ) => {
    e.preventDefault();

    setTab(type);
    onClick(type);
  };

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  return (
    <Nav>
      <FollowTab
        href="#"
        onClick={(e) => {
          handleClick(e, "follower");
        }}
        selected={tab === "follower"}
      >{`팔로워 (${profile.followerCount})`}</FollowTab>
      <FollowTab
        href="#"
        onClick={(e) => {
          handleClick(e, "followee");
        }}
        selected={tab === "followee"}
      >{`팔로잉 (${profile.followeeCount})`}</FollowTab>
    </Nav>
  );
};

const Nav = styled.nav`
  margin-bottom: 37px;
  text-align: center;
`;

const FollowTab = styled.a<{ selected: boolean }>`
  display: inline-block;
  width: 235px;
  height: 45px;
  ${theme.text.$body2}
  ${({ selected }) =>
    selected
      ? `
      border-bottom: 2px solid ${theme.color.$skyBlue};
      color: #312f2f;
      font-weight: 700;
    `
      : `
      border-bottom: 1px solid ${theme.color.$gray400};
      color: ${theme.color.$gray600};
      font-weight: 400;
    `}
  background-color: #fff;
  line-height: 45px;
  text-align: center;
  text-decoration: none;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
`;

export default FollowTabList;
