import { LazyMotion, domAnimation, m } from "framer-motion";
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
  return (
    <LazyMotion features={domAnimation}>
      <m.div layout>
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
      </m.div>
    </LazyMotion>
  );
};

export default CommentsThread;
