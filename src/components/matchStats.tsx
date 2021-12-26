import { useContext, useState } from "react";
import MarkdownView from "react-showdown";
import styled from "styled-components";
import { COLORS } from "../constants/colors";
import { GlobalSettingsContext } from "../context/globalSettingsProvider";
import PinSvg from "../svgs/pinSvg";

const MatchStats = ({ matchStats }: { matchStats: string }) => {
  const [isStatsPinned, setIsStatsPinned] = useState(false);
  const context = useContext(GlobalSettingsContext);

  // Expects certain formatting
  const trimmedStats = matchStats.slice(0, matchStats.indexOf("*****"));

  if (!context?.showMatchStats) {
    const heading = matchStats.match(/###(.*)/)?.[0] || "";
    return (
      <MatchInfoContainer>
        <MarkdownView
          className="stats-markdown heading-only"
          markdown={heading}
        />
      </MatchInfoContainer>
    );
  }

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

const MatchInfoContainer = styled.div<{ pinned?: boolean }>`
  position: ${(props) => (props.pinned ? "sticky;" : "static;")};
  top: -1px;

  display: flex;
  width: 100%;

  background-color: #212528;
  padding: 0.75rem 0.2rem;

  .heading-only {
    margin: 1rem;
  }

  .stats-markdown {
    color: #ffffffe1;
    width: 100%;

    h3 {
      font-size: 1.6rem;
      color: ${COLORS.secondary};
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

    table {
      display: inline-block;
      margin: 0 0.8rem 0.4rem 0;
      vertical-align: top;
      border: 1px solid ${COLORS.cardBg};
      thead {
        background-color: ${COLORS.cardBg};
      }
      td,
      th {
        border: 0.5px solid ${COLORS.cardBg};

        padding: 0.2rem 0.4rem;
      }
    }

    pre {
      margin-bottom: 1rem;
    }
    @media (min-width: 768px) {
      padding: 0.5rem 0.2rem 0;

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
