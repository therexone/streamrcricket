export type TComment = {
  content: string;
  flair: string;
  createdUTC: number;
  author: string;
  upvotes: number;
};

const fetchComments = async (threadId: string) => {
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
  }));

  return { matchStats, comments };
};

export { fetchComments };
