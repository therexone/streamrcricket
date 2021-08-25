import React from "react";
import styled from "styled-components";
import MarkdownView from "react-showdown";

import { useRouter } from "next/router";

import { TThreadsDataType } from "../utils/fetchLiveCricketThreads";
import { cardBaseStyles } from "../components/commentCard";
import Header from "../components/header";

const MatchThreadCard = styled.div`
  ${cardBaseStyles}
  margin-bottom: 1.2rem;
  padding: 2rem !important;

  .markdown {
    p,
    table {
      color: #ffffffdd;
    }
    h3 {
      color: #fdbc2c;
    }
  }
`;

const ThreadTitle = styled.h2`
  font-size: 1.6rem;
  margin-top: 0.8rem;
`;

type TTagTypes = "TODAY" | "POST_MATCH";

const Tag = styled.span<{ type: TTagTypes }>`
  padding: 0.5rem;
  background-color: #212528;
  font-weight: 600;
  color: ${(props) => (props.type === "TODAY" ? "#fd8610;" : "#3c4146;")};
  border-radius: 0.5rem;
  margin-right: 0.5rem;
`;

const MatchThreads = ({ threads }: { threads: TThreadsDataType[] }) => {
  const router = useRouter();

  if (threads.length === 0) {
    return <code>No crickets threads found :/</code>;
  }
  return (
    <>
      <Header>
        <h1>r/Cricket Match Threads</h1>
      </Header>

      {threads.map(({ selfText, title, id, createdUTC }) => (
        <MatchThreadCard
          key={id}
          onClick={() => {
            router.push({
              pathname: "/thread/[tid]",
              query: { tid: id },
            });
          }}
        >
          {title.includes("Post Match") ? (
            <Tag type="POST_MATCH">POST MATCH</Tag>
          ) : null}

          {new Date(createdUTC * 1000).getDate() === new Date().getDate() ? (
            <Tag type="TODAY">TODAY</Tag>
          ) : null}

          <ThreadTitle>{title}</ThreadTitle>

          <MarkdownView
            className="markdown"
            markdown={selfText.slice(0, 400).concat("...")}
            options={{ tables: true, emoji: true }}
          />
        </MatchThreadCard>
      ))}
    </>
  );
};

export default MatchThreads;
