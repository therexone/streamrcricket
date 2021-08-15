import React from "react";
import styled from "styled-components";
import MarkdownView from "react-showdown";

import { useRouter } from "next/router";

import { TThreadsDataType } from "../utils/fetchLiveCricketThreads";
import { cardBaseStyles } from "./commentCard";
import Header from "./header";

const MatchThreadCard = styled.div`
  ${cardBaseStyles}
  margin-bottom: 1.2rem;

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

const TodayTag = styled.span`
  padding: 0.5rem;
  background-color: #212528;
  font-weight: 600;
  color: #fd8610;
  border-radius: 0.5rem;
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
          {new Date(createdUTC * 1000).getDate() === new Date().getDate() ? (
            <TodayTag>TODAY</TodayTag>
          ) : null}

          <ThreadTitle>{title}</ThreadTitle>

          <MarkdownView
            className="markdown"
            markdown={selfText.substr(0, selfText.indexOf("*****"))}
            options={{ tables: true, emoji: true }}
          />
        </MatchThreadCard>
      ))}
    </>
  );
};

export default MatchThreads;
