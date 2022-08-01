import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import * as theme from "@/styles/theme";
import Image from "next/image";

const MAX_LENGTH = 5;

export interface PaginationProps {
  defaultPage?: number;
  count: number;
  onChange: (page: number) => void;
}

const Pagination = ({ defaultPage, count, onChange }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(defaultPage ?? 1);
  const startPage = (() => {
    if (count < MAX_LENGTH) {
      return 1;
    }

    if (count <= currentPage + Math.floor(MAX_LENGTH / 2)) {
      return count - MAX_LENGTH + 1;
    }

    return Math.max(1, currentPage - Math.floor(MAX_LENGTH / 2));
  })();

  const handleChange = useCallback(
    (nextCurrentPage: number) => {
      setCurrentPage(nextCurrentPage);
      onChange(nextCurrentPage);
    },
    [onChange]
  );
  const isActive = useCallback(
    (page: number) => currentPage === page,
    [currentPage]
  );

  return (
    <Container>
      {count <= MAX_LENGTH ? null : (
        <>
          <li>
            <ControlButton
              disabled={currentPage === 1}
              onClick={() => handleChange(1)}
            >
              <Image
                src="/icon/end.svg"
                alt="처음 페이지"
                width={13}
                height={12}
              />
            </ControlButton>
          </li>
          <li style={{ paddingRight: "30px" }}>
            <ControlButton
              disabled={currentPage === 1}
              onClick={() => handleChange(currentPage - 1)}
            >
              <Image
                src="/icon/back.svg"
                alt="이전 페이지"
                width={12}
                height={12}
              />
            </ControlButton>
          </li>
        </>
      )}

      {Array.from({
        length: Math.min(MAX_LENGTH, count),
      }).map((_, i) => {
        const page = startPage + i;

        return (
          <li key={page}>
            <PageButton
              type="button"
              onClick={() => handleChange(page)}
              active={isActive(page)}
              data-long={"9".repeat(count.toString().length)}
            >
              {page}
            </PageButton>
          </li>
        );
      })}

      {count <= MAX_LENGTH ? null : (
        <>
          <li style={{ paddingLeft: "30px" }}>
            <ControlButton
              disabled={currentPage === count}
              onClick={() => handleChange(currentPage + 1)}
            >
              <img
                src="/icon/back.svg"
                alt="다음 페이지"
                width={12}
                height={12}
                style={{ transform: "rotate(180deg)" }}
              />
            </ControlButton>
          </li>

          <li>
            <ControlButton
              disabled={currentPage === count}
              onClick={() => handleChange(count)}
            >
              <img
                src="/icon/end.svg"
                alt="마지막 페이지"
                width={13}
                height={12}
                style={{ transform: "rotate(180deg)" }}
              />
            </ControlButton>
          </li>
        </>
      )}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
`;

const ControlButton = styled.button<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 40px;
  border: 0;
  background-color: #fff;
  cursor: pointer;

  &:disabled {
    img {
      filter: invert(79%) sepia(0%) saturate(0%) hue-rotate(169deg)
        brightness(91%) contrast(88%);
    }
    cursor: not-allowed;
  }
`;

const PageButton = styled.button<{ active?: boolean }>`
  min-width: 40px;
  height: 40px;
  border: 0;
  padding: 0 5px;
  ${theme.text.$body1};
  text-align: center;
  font-weight: ${({ active }) => (active ? "700" : "400")};
  color: ${({ active }) =>
    active ? theme.color.$mainColor : theme.color.$gray600};
  background-color: #fff;
  cursor: pointer;
  box-sizing: border-box;

  &:hover:not(:disabled) {
    color: ${theme.color.$mainColor};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &::before {
    display: block;
    content: attr(data-long);
    font-weight: 700;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
`;

export default Pagination;
