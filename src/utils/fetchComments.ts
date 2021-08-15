export type TComment = {
  content: string;
  flair: string;
  createdUTC: number;
  author: string;
  upvotes: number;
  id: string;
};

export type TThreadData = {
  matchStats: string;
  comments: TComment[];
};

const fetchComments = async (threadId: string): Promise<TThreadData> => {
  const response = await fetch(
    `https://www.reddit.com/comments/${threadId}.json?sort=new&limit=20`,
    {
      method: "GET",
      mode: "cors",
    }
  );

  if (!response.ok)
    throw new Error(response.statusText || response.status.toString());

  const data = await response.json();
  const matchStats: string = data[0].data.children[0].data.selftext;

  const comments: TComment[] = data[1].data.children.map(({ data }: any) => ({
    content: data.body,
    flair: data.author_flair_text,
    createdUTC: data.created_utc,
    author: data.author,
    upvotes: data.ups,
    id: data.id,
  }));

  // last element has everything undefined
  return { matchStats, comments: comments.slice(0, -1) };
};

export { fetchComments };
