import React from "react";
import styled, { css, keyframes } from "styled-components";
import RefreshSvg from "../svgs/refreshSvg";
import debounce from "../utils/debounce";

type TRefreshButtonProps = {
  onClick: () => void;
  className?: string;
  isFetching: boolean;
  width?: number;
};

const RefreshButton = ({
  onClick,
  className = "",
  isFetching = false,
  width = 1,
}: TRefreshButtonProps) => {
  return (
    <RefreshIcon
      onClick={debounce(onClick)}
      isFetching={isFetching}
      className={className}
      width={width}
    >
      <RefreshSvg />
    </RefreshIcon>
  );
};

const spinAnimation = keyframes` 
100% { 
   transform:rotate(360deg); 
   } 
`;

const RefreshIcon = styled.div<{ isFetching: boolean; width: number }>`
  svg {
    ${(props) =>
      props.isFetching &&
      css`
        animation: ${spinAnimation} 0.5s linear infinite;
      `}
    width: ${(props) => `${props.width}rem`};
    height: auto;
    fill: #ffffff7f;
  }
`;

export default RefreshButton;
