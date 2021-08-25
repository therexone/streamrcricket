import styled, { css } from "styled-components";
import Emoji from "react-emoji-render";
import MarkdownView from "react-showdown";

type TCommentProps = {
  upvoteCount: number;
  userName: string;
  flairText: string;
  commentText: string;
  createdUTC: number;
  isLatest: boolean;
};

const CommentCard = ({
  upvoteCount,
  userName,
  flairText,
  commentText,
  createdUTC,
  isLatest,
}: TCommentProps) => {
  const timeString = new Date(createdUTC * 1000).toLocaleTimeString();

  const [flairEmoji = "", flairContent = ""] =
    flairText?.match(/:(.*?):/) ?? [];

  return (
    <CardContainer isLatest={isLatest}>
      <UpvoteCount>
        <div>^</div>
        {upvoteCount}
      </UpvoteCount>

      <MetaDataWrapper>
        <Username>{userName}</Username>
        <Flair>
          <Emoji text={flairEmoji.toLowerCase()} /> {flairContent}
        </Flair>
        <CommentTime>{timeString}</CommentTime>
      </MetaDataWrapper>

      <Comment>
        <MarkdownView
          className="comment-markdown"
          markdown={commentText}
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
  background-color: #2a2e31;
  padding: 1.5rem 2rem;
  margin-bottom: 0.4rem;
  @media (max-width: 768px) {
    padding: 1.2rem 1.2rem;
  }
`;

const CardContainer = styled.div<{ isLatest: boolean }>`
  ${cardBaseStyles}
  padding: 1.5rem 2rem;

  ${(props) => props.isLatest && "background-color: #3c4146;"}

  display: grid;
  grid-template-columns: max-content auto;
  grid-template-rows: auto;
  align-content: center;
`;

const MetaDataWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
`;

const Username = styled.div`
  font-weight: 600;
  font-size: rem;
  color: #fd8610;
  font-size: 1.2rem;
`;

const Comment = styled.div`
  .comment-markdown {
    h1,
    h2,
    h3,
    ol {
      margin: 0.5rem 0;
      /* font-size: 105%; */
    }
    img {
      height: 100%;
      width: 50%;
    }
    p {
      margin: 0;
      word-break: break-word;
    }
    font-size: 1.6rem;
    word-wrap: break-word;
    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }
`;

const Flair = styled.div`
  margin-top: 0.1rem;
  font-size: 0.8rem;
  margin-left: 0.8rem;
  color: #ffffffc5;
`;

const CommentTime = styled.div`
  margin-left: auto;
  font-size: 0.8rem;
  color: #ffffffc5;
`;

const UpvoteCount = styled.div`
  grid-row: 1 / span 2;
  align-self: center;
  margin-right: 1rem;
  background-color: #212528;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default CommentCard;
