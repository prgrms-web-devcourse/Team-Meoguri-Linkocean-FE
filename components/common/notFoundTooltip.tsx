import styled from "@emotion/styled";
import { text } from "@/styles/theme";

export type Member =
  | "joy"
  | "nadia"
  | "hyoni"
  | "hani"
  | "crush"
  | "haha"
  | "groot"
  | "jacob";
export interface TooltipProps {
  index: Member;
}

const NotFoundTooltip = ({ index, ...props }: TooltipProps) => {
  const { name, color } = TooltipMap[index];
  return (
    <Tooltip>
      <Logout color={color} {...props}>
        {name}
      </Logout>
      <Arrow color={color} />
    </Tooltip>
  );
};

export default NotFoundTooltip;

const TooltipMap = {
  joy: { name: "조이", color: "#DDC3EF" },
  nadia: { name: "나디아", color: "#EBCE5C" },
  hyoni: { name: "효니", color: "#8CC3E4" },
  hani: { name: "하니", color: "#D77589" },
  crush: { name: "크러쉬", color: "#9487CE" },
  haha: { name: "하하", color: "#ACF1EF" },
  groot: { name: "그루트", color: "#A73834" },
  jacob: { name: "제이콥", color: "#6BD49D" },
} as const;

const Tooltip = styled.div`
  display: position;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  margin-left: 17px;
  border-bottom: 12px solid transparent;
  border-top: 12px solid ${(props) => props.color};
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
`;

const Logout = styled.div`
  width: 81px;
  height: 40px;
  border-radius: 8px;
  border: 3px solid ${(props) => props.color};
  ${text.$subtitle1};
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
`;
