import styled, { css, keyframes } from "styled-components";
import Emoji from "react-emoji-render";
import MarkdownView from "react-showdown";
<<<<<<< HEAD
import { RefetchOptions, QueryObserverResult } from "react-query";

import { TComment } from "../utils/fetchComments";
import RefreshButton from "./refreshButton";

import { COLORS } from "../constants/colors";

=======
import { TComment } from "../utils/fetchComments";
import { RefetchOptions, QueryObserverResult } from "react-query";

>>>>>>> main
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
<<<<<<< HEAD
=======
  id,
>>>>>>> main
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
<<<<<<< HEAD

        {flairContent ? (
          <Flair>
            <Emoji text={flairEmoji.toLowerCase()} /> {flairContent}
          </Flair>
        ) : null}

        <CommentTime>{timeString}</CommentTime>

        <RefreshButton isFetching={isFetchingReplies} onClick={refetch} />
=======
        <Flair>
          <Emoji text={flairEmoji.toLowerCase()} /> {flairContent}
        </Flair>

        <CommentTime>{timeString}</CommentTime>

        <RefreshIcon
          onClick={() => refetch()}
          isFetchingReplies={isFetchingReplies}
        >
          <RefreshSvg />
        </RefreshIcon>
>>>>>>> main
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
<<<<<<< HEAD
    font-size: 1.3rem;
=======
    font-size: 1.4rem;
>>>>>>> main
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
<<<<<<< HEAD
  margin-right: 0.8rem;
=======
  margin-right: 1rem;
`;

const spinAnimation = keyframes` 
100% { 
   transform:rotate(360deg); 
   } 
`;

const RefreshSvg = () => (
  <svg
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 492.883 492.883"
  >
    <g>
      <g>
        <path
          d="M122.941,374.241c-20.1-18.1-34.6-39.8-44.1-63.1c-25.2-61.8-13.4-135.3,35.8-186l45.4,45.4c2.5,2.5,7,0.7,7.6-3
l24.8-162.3c0.4-2.7-1.9-5-4.6-4.6l-162.4,24.8c-3.7,0.6-5.5,5.1-3,7.6l45.5,45.5c-75.1,76.8-87.9,192-38.6,282
c14.8,27.1,35.3,51.9,61.4,72.7c44.4,35.3,99,52.2,153.2,51.1l10.2-66.7C207.441,421.641,159.441,407.241,122.941,374.241z"
        />
        <path
          d="M424.941,414.341c75.1-76.8,87.9-192,38.6-282c-14.8-27.1-35.3-51.9-61.4-72.7c-44.4-35.3-99-52.2-153.2-51.1l-10.2,66.7
c46.6-4,94.7,10.4,131.2,43.4c20.1,18.1,34.6,39.8,44.1,63.1c25.2,61.8,13.4,135.3-35.8,186l-45.4-45.4c-2.5-2.5-7-0.7-7.6,3
l-24.8,162.3c-0.4,2.7,1.9,5,4.6,4.6l162.4-24.8c3.7-0.6,5.4-5.1,3-7.6L424.941,414.341z"
        />
      </g>
    </g>
  </svg>
);

const RefreshIcon = styled.div<{ isFetchingReplies: boolean }>`
  svg {
    ${(props) =>
      props.isFetchingReplies &&
      css`
        animation: ${spinAnimation} 0.5s linear infinite;
      `}
    width: 1rem;
    fill: #ffffffc5;
  }
>>>>>>> main
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
