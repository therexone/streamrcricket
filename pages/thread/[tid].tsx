import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

import Header from "../../src/components/header";
import Loading from "../../src/components/loading";
import CommentsThread from "../../src/containers/commentsThread";
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

  const fetchBatchesRef = useRef<string[][]>([]).current;

  useEffect(() => {
    if (threadData && threadData.comments.length > 0) {
      const newCommentIds = threadData.comments.map((c) => c.id);
      const oldCommentsIds = comments.map((c) => c.id);
      const commentsDiff = newCommentIds.filter(
        (id) => !oldCommentsIds.includes(id)
      );
      console.log(commentsDiff);

      if (commentsDiff.length === 0) return;

      fetchBatchesRef.push(commentsDiff);

      const newComments = threadData.comments.filter(
        (comment, i) => comment.id === commentsDiff[i]
      );

      setComments((c) => [...newComments, ...c]);
      console.log(
        "%c[tid].tsx line:38 newComments",
        "color: #007acc;",
        newComments
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadData]);

  if (isLoading)
    return <Loading text="Getting comments from the Match thread" />;
  if (isError) return <div>{String(error)}</div>;

  return (
    <>
      <Header headerSize="small">
        <h2>streamrcricket</h2>
        {isFetching && <code> {"<>"}</code>}
      </Header>

      <CommentsThread
        matchStats={threadData?.matchStats || ""}
        comments={comments}
        fetchBatches={fetchBatchesRef}
      />
    </>
  );
};

export default ThreadPage;
