import styled from "@emotion/styled";
import React, { ButtonHTMLAttributes } from "react";

export interface FavoriteButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  favorite: boolean;
  size?: number;
}

const onClick = (e: React.MouseEvent<HTMLElement>) => {
  alert("좋아요><");
  e.stopPropagation();
};

const Star = ({ favorite, size = 14, ...props }: FavoriteButtonProps) => {
  return (
    <FavoritButton
      onClick={onClick}
      favorite={favorite}
      size={size}
      {...props}
    />
  );
};

const FavoritButton = styled.button<FavoriteButtonProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: none;
  background-color: #fff;
  padding: 10px;
  border-radius: 50%;
  background-image: ${(props) =>
    props.favorite ? "url('/icon/full-star.svg')" : "url('/icon/star.svg')"};
  background-size: 18px, 18px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: background-color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #ffec3f30;
  }
`;

export default Star;
