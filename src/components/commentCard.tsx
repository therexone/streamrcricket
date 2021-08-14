import styled from "styled-components";
import Emoji from "react-emoji-render";

type TCommentProps = {
  upvoteCount: number;
  userName: string;
  flairText: string;
  comment: string;
};

const CommentCard = ({
  upvoteCount,
  userName,
  flairText,
  comment,
}: TCommentProps) => (
  <CardContainer>
    <UpvoteCount>
      <div>^</div>
      69
    </UpvoteCount>
    <MetaDataWrapper>
      <Username>therexone </Username>
      <Flair>
        <Emoji text=":england: England" />
      </Flair>
    </MetaDataWrapper>
    <Comment>
      And they now have a bat deeper than our normal deep kind of lineup fuck
      me..get a wicket please india..
    </Comment>
  </CardContainer>
);

const CardContainer = styled.div`
  border-radius: 1rem;
  background-color: #2a2e31;
  padding: 1.5rem 2rem;

  display: grid;
  grid-template-columns: max-content auto;
  grid-template-rows: auto;
  width: 100%;
  align-content: center;
  @media (max-width: 768px) {
    padding: 1.2rem 1.8rem;
  }
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
