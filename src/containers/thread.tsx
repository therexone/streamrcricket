import React, { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styled from "styled-components";
import dynamic from "next/dynamic";

import { TComment, fetchComments } from "../utils/fetchComments";
import mergeCommentsUpdate from "../utils/mergeAndUpdateComments";
import Header from "../components/header";
import Loading from "../components/loading";
import Preferences from "../components/preferences";

const CommentsThread = dynamic(() => import("./commentsThread"), {
  ssr: false,
});
import { GlobalSettingsContext } from "../context/globalSettingsProvider";
import RefreshButton from "../components/refreshButton";

const Thread = () => {
  const context = useContext(GlobalSettingsContext);
  const [comments, setComments] = useState<TComment[]>([]);

  const router = useRouter();
  const { tid } = router.query;

  const {
    isLoading,
    isError,
    data: threadData,
    isFetching,
    error,
    refetch,
  } = useQuery(
    ["threadData", tid],
    () => fetchComments(tid as string, context?.commentsType),
    {
      refetchInterval: context?.refreshInterval,
      enabled: !!tid,
    }
  );

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadData]);

  if (isLoading)
    return <Loading text="Getting comments from the Match thread" />;
  if (isError) return <div>{String(error)}</div>;

  return (
    <>
      <Header headerSize="small">
        <h2>streamr/cricket</h2>
        <Preferences />
        <Fixed>
          <RefreshButton isFetching={isFetching} onClick={refetch} />
        </Fixed>
      </Header>

      <CommentsThread
        matchStats={threadData?.matchStats || ""}
        comments={comments}
        fetchBatches={fetchBatchesRef}
      />
    </>
  );
};

const Fixed = styled.div`
  padding: 1rem;
  border-radius: 100%;
  background-color: #212528;
  position: fixed;
  bottom: 1.2rem;
  right: 1.2rem;
`;

export default Thread;
