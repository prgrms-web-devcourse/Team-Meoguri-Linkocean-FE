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
  background-image: ${(props) =>
    props.favorite ? "url('/icon/full-star.svg')" : "url('/icon/star.svg')"};
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

export default Star;
