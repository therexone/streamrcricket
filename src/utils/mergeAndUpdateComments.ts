
import { TComment } from "./fetchComments";

const mergeCommentsUpdate = (
  initialComments: TComment[],
  commentsUpdate: TComment[]
): [string[], TComment[]] => {
  const [newCommentIds, updatedCommentIds] = diffCommentIds(
    initialComments,
    commentsUpdate
  );

  const updatedComments: TComment[] = [];

  const newComments = commentsUpdate.filter((c, i) => {
    if (c.id === newCommentIds[i]) {
      return true;
    }
    updatedComments.push(c);
    return false;
  });

  const remainingComments = initialComments.filter(
    (c) => !updatedCommentIds.includes(c.id)
  );

  const finalComments = [
    ...newComments,
    ...updatedComments,
    ...remainingComments,
  ];

  return [newCommentIds, finalComments];
};

function diffCommentIds(
  initialComments: TComment[],
  commentsUpdate: TComment[]
) {
  const initialCommentIds = initialComments.map((ic) => ic.id);
  const commentsUpdateIds = commentsUpdate.map((cu) => cu.id);

  const updateIds: string[] = [];
  const newIds = commentsUpdateIds.filter((id) => {
    if (!initialCommentIds.includes(id)) {
      return true;
    }
    updateIds.push(id);
    return false;
  });

  return [newIds, updateIds];
}

export default mergeCommentsUpdate;
