import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styled from "styled-components";

import { TComment } from "../utils/fetchComments";
import fetchReplies from "../utils/fetchReplies";
import CommentCard from "../components/commentCard";
import LoadingSpinner from "../components/loadingSpinner";

type TCommentWrapperProps = {
  comment: TComment;
  className?: string;
  isLatestFetch?: boolean;
};

const CommentWrapper = ({
  comment,
  className = "",
  isLatestFetch = false,
}: TCommentWrapperProps) => {
  const router = useRouter();

  const { tid } = router.query;

  const {
    data: replies,
    refetch,
    isLoading,
  } = useQuery(comment.id, () => fetchReplies(tid as string, comment.id), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: false,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });

  const showMoreButton = comment.more?.length && !replies;

  const latestReplies = replies ? replies : comment.repliesData;

  return (
    <CommentContainer className={className}>
      <CommentCard
        {...comment}
        isLatest={isLatestFetch}
        refetch={refetch}
        isFetchingReplies={isLoading}
      />

      {latestReplies.map((c: TComment) => (
        <CommentWrapper className="reply" comment={c} key={`reply-${c.id}`} />
      ))}

      {showMoreButton ? (
        <MoreButton
          onClick={() => {
            refetch();
          }}
        >
          {isLoading ? <LoadingSpinner /> : `+ ${comment.more?.length} more`}
        </MoreButton>
      ) : null}
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  &.parent {
    width: 100%;
  }
  .reply {
    border-left: 1px solid #fdbc2c;
    margin: 0.2rem 0 0.5rem 0.5rem;
  }

`;

const MoreButton = styled.div`
  width: fit-content;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.1rem 0.3rem;
  background-color: #2a2e31;
  color: #fd8610;
  margin-left: 0.5rem;
`;

export default CommentWrapper;
