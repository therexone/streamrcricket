import { useState } from "react";
import MarkdownView from "react-showdown";
import styled from "styled-components";

const MatchStats = ({ matchStats }: { matchStats: string }) => {
  const [isStatsPinned, setIsStatsPinned] = useState(false);
  return (
    <MatchInfoContainer pinned={isStatsPinned}>
      <MarkdownView
        className="stats-markdown"
        markdown={matchStats}
        options={{
          tables: true,
          emoji: true,
          simplifiedAutoLink: true,
          openLinksInNewWindow: true,
        }}
      />
      <PinStats
        onClick={() => setIsStatsPinned((p) => !p)}
        pinned={isStatsPinned}
      >
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="16px"
          height="16px"
          viewBox="0 0 512 512"
        >
          <path
            d="M322.397,252.352l75.068-75.067c19.346,5.06,40.078,3.441,58.536-4.873L339.589,56c-8.313,18.458-9.933,39.189-4.873,58.536
l-75.066,75.067c-35.168-16.745-76.173-17.14-111.618-1.176l65.009,65.01L55.999,456l202.563-157.041l65.01,65.01
C339.535,328.526,339.142,287.519,322.397,252.352z M201.513,216.553c0,0-16.568-16.568-21.323-21.035
c37.027-10.806,61.375,4.323,61.375,4.323C218.946,192.781,201.513,216.553,201.513,216.553z"
          />
        </svg>
      </PinStats>
    </MatchInfoContainer>
  );
};

const MatchInfoContainer = styled.div<{ pinned: boolean }>`
  position: ${(props) => (props.pinned ? "sticky;" : "static;")};
  top: -1px;

  display: flex;

  background-color: #212528;
  padding: 0.5rem 0 0 0;

  .stats-markdown {
    color: #ffffffe1;
    width: 100%;

    h3 {
      font-size: 1.6rem;
      color: #fdbc2c;
      margin: 0;
    }
    p:last-of-type {
      background-color: #fdbb2c4b;
      padding: 0.4rem;
      border-radius: 0.5rem;
      color: #fdbc2c;
      text-align: center;
    }
    margin-bottom: 1.2rem;
    table {
      display: inline-block;
      margin: 0 0.8rem 0.4rem 0;
      vertical-align: top;
      thead {
        background-color: #2a2e31;
      }
      td,
      th {
        padding: 0.2rem 0.4rem;
      }
    }
    pre {
      margin-bottom: 1rem;
    }
    @media (min-width: 768px) {
      font-size: 110%;
    }
  }
`;

const PinStats = styled.div<{ pinned: boolean }>`
  align-self: baseline;
  margin-top: 0.3rem;

  svg {
    fill: ${props => props.pinned ? '#ffffffc0' : '#ffffff44'} ;
  }
`;

export default MatchStats;
