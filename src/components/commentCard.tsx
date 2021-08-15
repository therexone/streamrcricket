import styled, { css } from "styled-components";
import Emoji from "react-emoji-render";

type TCommentProps = {
  upvoteCount: number;
  userName: string;
  flairText: string;
  commentText: string;
  createdUTC: number;
};

const CommentCard = ({
  upvoteCount,
  userName,
  flairText,
  commentText,
  createdUTC,
}: TCommentProps) => {
  const timeString = new Date(createdUTC * 1000).toLocaleTimeString();
  console.log(timeString);
  return (
    <CardContainer>
      <UpvoteCount>
        <div>^</div>
        {upvoteCount}
      </UpvoteCount>

      <MetaDataWrapper>
        <Username>{userName}</Username>
        <Flair>{flairText && <Emoji text={flairText.toLowerCase()} />}</Flair>
        <CommentTime>{timeString}</CommentTime>
      </MetaDataWrapper>

      <Comment>{commentText}</Comment>
    </CardContainer>
  );
};

export const cardBaseStyles = css`
  border-radius: 1rem;
  width: 100%;
  background-color: #2a2e31;
  padding: 1.5rem 2rem;
  margin-bottom: 1.2rem;
  @media (max-width: 768px) {
    padding: 1.2rem 1.8rem;
  }
`;

const CardContainer = styled.div`
  ${cardBaseStyles}
  border-radius: 1rem;
  background-color: #2a2e31;
  padding: 1.5rem 2rem;

  display: grid;
  grid-template-columns: max-content auto;
  grid-template-rows: auto;
  width: 100%;
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
  font-size: 1.6rem;
  @media (max-width: 768px) {
    font-size: 1.3rem;
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
  margin-right: 1.2rem;
  background-color: #212528;
  padding: 0.5rem;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default CommentCard;
