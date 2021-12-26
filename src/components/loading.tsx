import React from "react";
import styled, { keyframes } from "styled-components";

import Image from "next/image";
import rcricketLogo from "../../public/static/image/rcricketsubimg.png";

const Loading = ({ text }: { text: string }) => {
  return (
    <LoadingContainter>
      <div className="image-wrapper">
        <Image
          className="loading"
          src={rcricketLogo}
          width="60"
          height="60"
          alt="r/cricket"
        />
      </div>
      {text}
    </LoadingContainter>
  );
};

const bounceAnimation = keyframes`
 0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
`;

const LoadingContainter = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  width: 60%;
  text-align: center;

  .image-wrapper {
    margin-bottom: 1.2rem;
    animation: ${bounceAnimation} ease infinite 1s;
  }
`;

export default Loading;
