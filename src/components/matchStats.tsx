import { useState } from "react";
import MarkdownView from "react-showdown";
import styled from "styled-components";
import PinSvg from "../svgs/pinSvg";

const MatchStats = ({ matchStats }: { matchStats: string }) => {
  const [isStatsPinned, setIsStatsPinned] = useState(false);

  // Expects certain formatting
  const trimmedStats = matchStats.slice(0, matchStats.indexOf("*****"));

  return (
    <MatchInfoContainer pinned={isStatsPinned}>
      <MarkdownView
        className="stats-markdown"
        markdown={trimmedStats ? trimmedStats : matchStats}
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
        <PinSvg />
      </PinStats>
    </MatchInfoContainer>
  );
};

const MatchInfoContainer = styled.div<{ pinned: boolean }>`
  position: ${(props) => (props.pinned ? "sticky;" : "static;")};
  top: -1px;

  display: flex;

  background-color: #212528;
  padding: 0.5rem 0.2rem 0;

  .stats-markdown {
    color: #ffffffe1;
    width: 100%;

    h3 {
      font-size: 1.6rem;
      color: #fdbc2c;
      margin: 0;
    }
    p {
      margin-top: 1rem;
    }
    p:last-of-type {
      width: max-content;
      background-color: #fdbb2c4b;
      padding: 0.4rem 0.8rem;
      border-radius: 0.5rem;
      color: #fdbc2c;
      text-align: center;
    }
    /* margin-bottom: 1.2rem; */
    table {
      display: inline-block;
      margin: 0 0.8rem 0.4rem 0;
      vertical-align: top;
      border: 1px solid #2a2e31;
      thead {
        background-color: #2a2e31;
      }
      td,
      th {
        border: 0.5px solid #2a2e31;

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
    fill: ${(props) => (props.pinned ? "#ffffffc0" : "#ffffff44")};
    transform: rotate(-45deg);
  }
`;

export default MatchStats;
