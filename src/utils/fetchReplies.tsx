import { extractRevelantInfoFromCommentData } from "./fetchComments";

const fetchReplies = async (threadId: string, commentId: string) => {
  console.log(
    "%cHello fetchReplies.tsx line:4 ",
    "background: green; color: white; display: block;"
  );

  try {
    const response = await fetch(
      `https://www.reddit.com/comments/${threadId}/_/${commentId}.json`,
      {
        method: "GET",
        mode: "cors",
      }
    );

    if (!response.ok) {
      throw new Error(`${response.status} : Failed to fetch`);
    }

    const [, commentData] = await response.json();

    const parentCommentReplies =
      commentData?.data?.children[0]?.data?.replies?.data?.children;

    const replies = parentCommentReplies?.map(({ data: replyComment }: any) =>
      extractRevelantInfoFromCommentData(replyComment)
    );

    return replies;
  } catch (error) {
    // console.log("%cfetchReplies.tsx line:33 error", "color: #007acc;", error);
    throw new Error(`Failed to fetch replies: ${error}`);
  }
};

export default fetchReplies;
