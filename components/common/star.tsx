import bookmarkAPI from "@/utils/apis/bookmark";
import styled from "@emotion/styled";
import React, { ButtonHTMLAttributes, useEffect, useState } from "react";

export interface FavoriteButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  favorite: boolean;
  size?: number;
  id: string;
}

const Star = ({ favorite, size = 14, id, ...props }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  useEffect(() => {
    setIsFavorite(favorite);
  }, [favorite]);

  const onClick = async (e: React.MouseEvent<HTMLElement>) => {
    if (!id) return;
    try {
      if (isFavorite) {
        await bookmarkAPI.deleteFavorite(id);
      } else {
        await bookmarkAPI.createFavorite(id);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
    } finally {
      e.stopPropagation();
    }
  };

  return (
    <FavoritButton
      onClick={(e) => onClick(e)}
      favorite={isFavorite}
      size={size}
      id={id}
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
