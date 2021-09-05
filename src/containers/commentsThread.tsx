import MatchStats from "../components/matchStats";
import { TComment } from "../utils/fetchComments";
import CommentWrapper from "./commentWrapper";

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
  // console.log(
  //   "%ccommentsThread.tsx line:25 comments",
  //   "color: #007acc;",
  //   comments.map((c) => c.id)
  // );

  return (
    <>
      <MatchStats matchStats={matchStats} />

      {comments.map((c) => (
        <CommentWrapper
          className="parent"
          comment={c}
          key={`root-${c.id}`}
          isLatestFetch={
            fetchBatches[fetchBatches.length - 1].includes(c.id) &&
            fetchBatches.length !== 1
          }
        />
      ))}
    </>
  );
};

export default CommentsThread;
