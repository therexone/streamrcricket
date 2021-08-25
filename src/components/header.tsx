import React, { ReactNode } from "react";
import Image from "next/image";
import styled from "styled-components";

import rcricketLogo from "../../public/static/image/rcricketsubimg.png";
import { useRouter } from "next/router";

const Container = styled.div<{ headerSize: THeaderProps["headerSize"] }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: ${(props) => (props.headerSize === "small" ? "0" : "1.2rem")};

  h2 {
    font-size: 1.2rem;
    margin: 0;
  }
  code {
    position: absolute;
    right: 1rem;
  }
`;

type THeaderProps = {
  children: ReactNode;
  headerSize?: "small" | "normal";
};
const Header = ({ children, headerSize = "normal" }: THeaderProps) => {
  const router = useRouter();
  const logoDimensions =
    headerSize === "small"
      ? { width: "30", height: "30" }
      : { width: "60", height: "60" };
  return (
    <Container headerSize={headerSize} onClick={() => router.push("/")}>
      <Image src={rcricketLogo} {...logoDimensions} alt="r/cricket" />

      {children}
    </Container>
  );
};

export default Header;
