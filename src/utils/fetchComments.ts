export type TComment = {
  content: string;
  flair: string;
  createdUTC: number;
  author: string;
  upvotes: number;
  id: string;
  repliesData?: TComment[];
  more?: string[];
};

export type TThreadData = {
  matchStats: string;
  comments: TComment[];
};

const fetchComments = async (
  threadId: string,
  sort: "new" | "top" = "new"
): Promise<TThreadData> => {
  const response = await fetch(
    `https://www.reddit.com/comments/${threadId}.json?sort=${sort}&limit=20`,
    {
      method: "GET",
      mode: "cors",
    }
  );

  if (!response.ok)
    throw new Error(response.statusText || response.status.toString());

  const data = await response.json();
  const matchStats: string = data[0].data.children[0].data.selftext;

  const comments: TComment[] = data[1].data.children.map(
    ({ data: commentData }: any) =>
      extractRevelantInfoFromCommentData(commentData)
  );

  // last element has everything undefined
  return { matchStats, comments: comments.slice(0, -1) };
};

const extractRevelantInfoFromCommentData = (commentData: any) => {
  const repliesData = commentData.replies?.data?.children;

  const replies: TComment[] = [];
  const more: string[] = [];
  if (repliesData) {
    repliesData.forEach((r: any) => {
      if (r.kind === "t1") {
        replies.push(extractRevelantInfoFromCommentData(r.data));
      }
      if (r.kind === "more") {
        more.push(...r.data.children);
      }
    });
  }

  const modifiedContent = commentData.body?.replace(
    /\(giphy\|(.*?)\|?(.*?)\)/,
    "(https://media4.giphy.com/media/$2/giphy.gif)"
  );

  return {
    content: modifiedContent,
    repliesData: replies,
    flair: commentData.author_flair_text,
    createdUTC: commentData.created_utc,
    author: commentData.author,
    upvotes: commentData.ups,
    id: commentData.id,
    more,
  };
};

export { fetchComments, extractRevelantInfoFromCommentData };
