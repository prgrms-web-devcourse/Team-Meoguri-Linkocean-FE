import styled from "@emotion/styled";
import React, { ButtonHTMLAttributes } from "react";

export interface FavoritButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  favorit: boolean;
  size?: number;
}

const Star = ({ favorit, size = 14, ...props }: FavoritButtonProps) => {
  return <FavoritButton favorit={favorit} size={size} {...props} />;
};

const FavoritButton = styled.button<FavoritButtonProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: none;
  background-color: #fff;
  background-image: ${(props) =>
    props.favorit ? "url('/icon/full-star.svg')" : "url('/icon/star.svg')"};
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

export default Star;
