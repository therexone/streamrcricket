import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import MarkdownView from "react-showdown";

import CommentCard from "../../src/components/commentCard";
import Header from "../../src/components/header";
import Loading from "../../src/components/loading";
import { fetchComments } from "../../src/utils/fetchComments";

const ThreadPage = () => {
  const router = useRouter();
  const { tid } = router.query;
  const {
    isLoading,
    isError,
    data: threadData,
    error,
  } = useQuery(["threadData", tid], () => fetchComments(tid as string), {
    refetchInterval: 60000,
  });

  if (isLoading)
    return <Loading text="Getting comments from the Match thread" />;
  if (isError) return <div>{String(error)}</div>;

  return (
    <div>
      <Header headerSize="small">
        <h2>streamrcricket</h2>
      </Header>
      <MarkdownView
        className="stats-markdown"
        markdown={
          threadData?.matchStats.substr(
            0,
            threadData.matchStats.indexOf("*****")
          ) || ""
        }
        options={{ tables: true, emoji: true }}
      />
      {threadData?.comments.map(
        ({ content, flair, author, upvotes, createdUTC }, index) => (
          <CommentCard
            key={index}
            userName={author}
            upvoteCount={upvotes}
            commentText={content}
            flairText={flair}
            createdUTC={createdUTC}
          />
        )
      )}
    </div>
  );
};

export default ThreadPage;
