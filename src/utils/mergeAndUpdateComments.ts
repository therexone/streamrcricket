// Take the existing comments and merge with new comments -> final -> new comments + merged comments + untouched comments

import { TComment } from "./fetchComments";

const mergeCommentsUpdate = (
  initialComments: TComment[],
  commentsUpdate: TComment[]
): [string[], TComment[]] => {
  const newCommentIds = diffCommentIds(initialComments, commentsUpdate);

  const updatedComments: TComment[] = [];

  const newComments = commentsUpdate.filter((c, i) => {
    if (c.id !== newCommentIds[i]) {
      updatedComments.push(c);
      return false;
    }
    return true;
  });

  const remainingComments = initialComments.filter(
    (c, i) => c.id !== newCommentIds[i]
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

  const newIds = commentsUpdateIds.filter(
    (id) => !initialCommentIds.includes(id)
  );

  return newIds;
}

export default mergeCommentsUpdate;
