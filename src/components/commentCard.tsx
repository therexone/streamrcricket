import styled, { css } from "styled-components";
import Emoji from "react-emoji-render";
import MarkdownView from "react-showdown";
import { RefetchOptions, QueryObserverResult } from "react-query";

import { TComment } from "../utils/fetchComments";
import RefreshButton from "./refreshButton";

import { COLORS } from "../constants/colors";

interface TCommentCardProps extends TComment {
  isLatest?: boolean;
  className?: string;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;

  isFetchingReplies: boolean;
}

const CommentCard = ({
  upvotes,
  author,
  flair,
  content,
  createdUTC,
  isLatest = false,
  className = "",
  refetch,
  isFetchingReplies,
}: TCommentCardProps) => {
  const timeString = new Date(createdUTC * 1000).toLocaleTimeString();

  const [flairEmoji = "", flairContent = ""] = flair?.match(/:(.*?):/) ?? [];

  return (
    <CardContainer isLatest={isLatest} className={className}>
      <UpvoteCount>
        <div>^</div>
        {upvotes}
      </UpvoteCount>

      <MetaDataWrapper>
        <Username>{author}</Username>

        {flairContent ? (
          <Flair>
            <Emoji text={flairEmoji.toLowerCase()} /> {flairContent}
          </Flair>
        ) : null}

        <CommentTime>{timeString}</CommentTime>

        <RefreshButton isFetching={isFetchingReplies} onClick={refetch} />
      </MetaDataWrapper>

      <Comment>
        <MarkdownView
          className="comment-markdown"
          markdown={content}
          options={{
            emoji: true,
            simplifiedAutoLink: true,
            openLinksInNewWindow: true,
          }}
        />
      </Comment>
    </CardContainer>
  );
};

export const cardBaseStyles = css`
  border-radius: 0.8rem;
  width: 100%;
  background-color: ${COLORS.cardBg};
  padding: 1.5rem 2rem;
  margin-bottom: 0.4rem;
  @media (max-width: 768px) {
    padding: 1.2rem 1.2rem;
  }
`;

const CardContainer = styled.div<{ isLatest: boolean }>`
  ${cardBaseStyles}
  padding: 1.5rem 2rem;

  ${(props) => props.isLatest && "background-color: #3c4146dd;"}

  display: grid;
  grid-template-columns: max-content auto;
  grid-template-rows: auto;
  align-content: center;
`;

const MetaDataWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
  min-width: 0;
`;

const Username = styled.div`
  font-weight: 600;
  font-size: rem;
  color: ${COLORS.primary};
  font-size: 1.2rem;
`;

const Comment = styled.div`
  .comment-markdown {
    h1,
    h2,
    h3,
    ol {
      margin: 0.5rem 0;
    }
    img {
      height: 100%;
      width: 50%;
    }
    p {
      margin: 0;
      word-break: break-word;
    }
    font-size: 1.3rem;
    word-wrap: break-word;
    color: ${COLORS.textPrimary};
    @media (max-width: 768px) {
      font-size: 1.2rem;
      line-height: 1.4;
    }
  }
`;

const Flair = styled.div`
  margin-top: 0.1rem;
  font-size: 0.8rem;
  margin-left: 0.4rem;
  color: ${COLORS.textSecondary};
  max-width: 30%;
  flex-shrink: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${COLORS.bg};
  padding: 0.2rem 0.4rem;
  border-radius: 0.5rem;
`;

const CommentTime = styled.div`
  margin-left: auto;
  font-size: 0.8rem;
  color: #ffffffc5;
  margin-right: 0.8rem;
`;

const UpvoteCount = styled.div`
  grid-row: 1 / span 2;
  align-self: center;
  margin-right: 1rem;
  background-color: ${COLORS.bg};
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default CommentCard;
