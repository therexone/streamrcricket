import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import MarkdownView from "react-showdown";

import CommentCard from "../../src/components/commentCard";
import Header from "../../src/components/header";
import Loading from "../../src/components/loading";
import { fetchComments, TComment } from "../../src/utils/fetchComments";

const ThreadPage = () => {
  const router = useRouter();
  const [comments, setComments] = useState<TComment[]>([]);
  const { tid } = router.query;
  const {
    isLoading,
    isError,
    data: threadData,
    error,
    isFetching,
  } = useQuery(["threadData", tid], () => fetchComments(tid as string), {
    refetchInterval: 60000,
  });

  useEffect(() => {
    if (threadData && threadData.comments.length > 0) {
      const newCommentIds = threadData.comments.map((c) => c.id);
      const oldCommentsIds = comments.map((c) => c.id);
      const commentsDiff = newCommentIds.filter(
        (id) => !oldCommentsIds.includes(id)
      );
      // console.log(commentsDiff);
      const newComments = threadData.comments.filter(
        (comment, i) => (comment.id = commentsDiff[i])
      );

      setComments((c) => [...newComments, ...c]);
      // console.log(newComments);
    }
    // console.log(comments.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadData]);

  if (isLoading)
    return <Loading text="Getting comments from the Match thread" />;
  if (isError) return <div>{String(error)}</div>;

  return (
    <div>
      <Header headerSize="small">
        <h2>streamrcricket</h2>
        {isFetching && <code> {"<>"}</code>}
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
      {comments.map(({ content, flair, author, upvotes, createdUTC, id }) => (
        <CommentCard
          key={id}
          userName={author}
          upvoteCount={upvotes}
          commentText={content}
          flairText={flair}
          createdUTC={createdUTC}
        />
      ))}
    </div>
  );
};

export default ThreadPage;
