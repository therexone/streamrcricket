import MarkdownView from "react-showdown";
import styled from "styled-components";
import CommentCard from "../components/commentCard";
import Header from "../components/header";
import { TComment, TThreadData } from "../utils/fetchComments";

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
    <>
      <ShowHideInfo>
        <MarkdownView
          className="stats-markdown"
          markdown={matchStats}
          options={{
            tables: true,
            emoji: true,
            simplifiedAutoLink: true,
            openLinksInNewWindow: true,
          }}
        />
      </ShowHideInfo>

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

const ShowHideInfo = styled.div`
  position: relative;
  margin: 2em auto;
  /* width: 70%; */
  max-height: 100px;
  overflow: hidden;
  transition: max-height 0.5s ease;

  .fade {
    background: linear-gradient(
      to bottom,
      rgba($bg-color, 0) 0%,
      rgba($bg-color, 1) 75%
    );
    height: 100px;
    margin-top: -100px;
    position: relative;
  }
`;

export default CommentsThread;
