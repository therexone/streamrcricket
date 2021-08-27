import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import dynamic from "next/dynamic";

import Header from "../../src/components/header";
import Loading from "../../src/components/loading";
const CommentsThread = dynamic(import("../../src/containers/commentsThread"));
import { fetchComments, TComment } from "../../src/utils/fetchComments";
import mergeCommentsUpdate from "../../src/utils/mergeAndUpdateComments";

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
      const [newCommentIds, finalComments] = mergeCommentsUpdate(
        comments,
        threadData.comments
      );

      if (newCommentIds.length === 0) return;

      fetchBatchesRef.push(newCommentIds);

      setComments(finalComments);
      console.log(
        "%c[tid].tsx line:38 newComments",
        "color: #007acc;",
        newCommentIds
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
