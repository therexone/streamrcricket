import React, { ReactNode } from "react";
import Image from "next/image";
import styled from "styled-components";

import rcricketLogo from "../../public/static/image/rcricketsubimg.png";
import { useRouter } from "next/router";

type THeaderProps = {
  children: ReactNode;
  headerSize?: "small" | "normal";
};
const Header = ({ children, headerSize = "normal" }: THeaderProps) => {
  const router = useRouter();

  const logoDimensions =
    headerSize === "small"
      ? { width: "25", height: "25" }
      : { width: "40", height: "40" };

  return (
    <Container headerSize={headerSize}>
      <Image
        src={rcricketLogo}
        {...logoDimensions}
        alt="r/cricket"
        onClick={() => router.push("/")}
      />

      {children}
    </Container>
  );
};

const Container = styled.header<{ headerSize: THeaderProps["headerSize"] }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    cursor: pointer;
  }

  margin-bottom: ${(props) => (props.headerSize === "small" ? "0" : "1.2rem")};

  div {
    margin-left: auto;
  }

  h2 {
    font-size: 1.2rem;
    margin: 0;
  }
  code {
    position: absolute;
    right: 1rem;
  }
`;

export default Header;
