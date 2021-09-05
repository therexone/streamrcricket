import { useState } from "react";
import styled, { css } from "styled-components";
import GearSvg from "../svgs/gearSvg";

const GearIcon = styled.div`
  svg {
    vertical-align: middle;
    width: 1.4rem;
    height: 1.4rem;
    fill: #ffffff86;
  }
`;

const Preferences = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <GearIcon onClick={() => setOpen(!isOpen)}>
        <GearSvg />
      </GearIcon>
      <PrefsModal
        isOpen={isOpen}
        onClick={(e) => {
          if (e.currentTarget != e.target) return;
          setOpen(!isOpen);
        }}
      >
        <Sheet isOpen={isOpen}>
          <SheetHeader>Preferences</SheetHeader>
          <div>Refresh Interval</div>
          <div>Comment type</div>
          <div>Hide Match Stats</div>
        </Sheet>
      </PrefsModal>
    </div>
  );
};

const PrefsModal = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => css`
    height: ${isOpen ? "100vh" : 0};
  `}
  background-color: #ff000050;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1;
`;

const SheetHeader = styled.div`
  text-align: center;
  font-weight: 600;
  grid-column: span 2;
`;

const Sheet = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => css`
    height: ${isOpen ? "20vh" : 0};
    bottom: ${isOpen ? 0 : "-99px"};
  `}
  position: fixed;
  left: 0;
  z-index: 2;

  padding: 1rem;
  border-radius: 1.2rem 1.2rem 0 0;

  width: 40rem;

  background-color: #141618;

  transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);

  @media (max-width: 768px) {
    width: 100vw;
  }

  display: grid;
  grid-template-columns: min-content min-content;
  grid-template-rows: min-content min-content;
`;

export default Preferences;
