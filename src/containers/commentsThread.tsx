// import { useEffect } from "react";
import CommentCard from "../components/commentCard";
import MatchStats from "../components/matchStats";
import { TComment } from "../utils/fetchComments";

type TCommentsThreadProps = {
  matchStats: string;
  comments: TComment[];
  fetchBatches: string[][];
};

const CommentsThread = ({
  matchStats,
  comments,
  fetchBatches,
}: TCommentsThreadProps) => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [comments]);

  return (
    <>
      <MatchStats matchStats={matchStats} />

      {comments.map(({ content, flair, author, upvotes, createdUTC, id }) => (
        <CommentCard
          isLatest={
            fetchBatches[fetchBatches.length - 1].includes(id) &&
            fetchBatches.length !== 1
          }
          key={id}
          userName={author}
          upvoteCount={upvotes}
          commentText={content}
          flairText={flair}
          createdUTC={createdUTC}
        />
      ))}
    </>
  );
};

export default CommentsThread;
