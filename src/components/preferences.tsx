import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
import router from "next/router";

import { GlobalSettingsContext } from "../context/globalSettingsProvider";
import GearSvg from "../svgs/gearSvg";
import { COLORS } from "../constants/colors";

const Preferences = () => {
  const [isOpen, setOpen] = useState(false);
  const context = useContext(GlobalSettingsContext);

  const {
    refreshInterval,
    setRefreshInterval,
    commentsType,
    setCommentsType,
    showMatchStats,
    setShowMatchStats,
  } = context ?? {};

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
          <SheetHeader>
            <span>PREFERENCES</span>
            <span className="close" onClick={() => setOpen(false)}>
              Close X
            </span>
          </SheetHeader>

          <span>Refresh Interval</span>
          <div>
            <Option
              active={refreshInterval === 30000}
              onClick={() => setRefreshInterval?.(30000)}
            >
              30 s
            </Option>
            <Option
              active={refreshInterval === 40000}
              onClick={() => setRefreshInterval?.(40000)}
            >
              40 s
            </Option>

            <Option
              active={refreshInterval === 50000}
              onClick={() => setRefreshInterval?.(50000)}
            >
              50 s
            </Option>
          </div>

          <span>Comments type</span>
          <div>
            <Option
              active={commentsType === "new"}
              onClick={() => {
                setCommentsType?.("new");
                router.reload();
              }}
            >
              New (latest)
            </Option>
            <Option
              active={commentsType === "top"}
              onClick={() => {
                setCommentsType?.("top");
                router.reload();
              }}
            >
              {" "}
              Top
            </Option>
          </div>

          <span>Show Match Stats</span>
          <ToggleInput>
            <input
              type="checkbox"
              id="switch"
              checked={showMatchStats}
              onChange={() => setShowMatchStats?.(!showMatchStats)}
            />
            <label htmlFor="switch">Toggle</label>
          </ToggleInput>
        </Sheet>
      </PrefsModal>
    </div>
  );
};

const GearIcon = styled.div`
  svg {
    vertical-align: middle;
    width: 1.5rem;
    height: 1.5rem;
    fill: #ffffff86;
  }
`;

const PrefsModal = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => css`
    height: ${isOpen ? "100vh" : 0};
  `}
  background-color: #2a2e3157;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1;
`;

const SheetHeader = styled.div`
  font-weight: 600;
  grid-column: span 2;

  width: 100%;
  border-radius: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;

  .close {
    border-radius: 0.8rem;
    padding: 0.2rem 0.6rem;
    background-color: #fd86103d;
    color: ${COLORS.primary};
  }
`;

const Sheet = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => css`
    height: ${isOpen ? "25vh" : 0};
    bottom: ${isOpen ? 0 : "-99px"};
  `}
  position: fixed;
  z-index: 2;

  padding: 1.5rem;
  border-radius: 1rem 1rem 0 0;
  left: 50%;
  transform: translateX(-50%);

  width: 50rem;
  margin: 0 auto;

  background-color: #1c1f22;

  transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);

  @media (max-width: 768px) {
    left: 0;
    transform: none;
    width: 100vw;
  }

  display: grid;
  grid-template-columns: max-content auto;
  grid-template-rows: min-content auto auto auto;
  grid-row-gap: 0.2rem;
  align-items: center;
`;

const ToggleInput = styled.div`
  input[type="checkbox"] {
    height: 0;
    width: 0;
    visibility: hidden;
    position: absolute;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 3rem;
    height: 1.5rem;
    border: 1px solid ${COLORS.primary};
    display: block;
    border-radius: 1rem;
    position: relative;
  }

  label:after {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 1.4rem;
    height: 99%;
    background: ${COLORS.primary};
    border-radius: 0.9rem;
    transition: 0.2s;
  }

  input:checked + label {
    background: #ffa74f67;
  }

  input:checked + label:after {
    background: ${COLORS.primary};
    left: 100%;
    transform: translateX(-100%);
  }
`;

const Option = styled.span<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#fd86103d" : "none")};
  padding: 0.4rem 0.8rem;
  border: 1px solid #fd861037;
  margin-left: 1rem;
  border-radius: 0.4rem;
`;

export default Preferences;
