// const REDDIT_STREAM_HOME_URL = "https://reddit-stream.com/";
const R_CRICKET_REDDIT_URL = "https://www.reddit.com/r/Cricket.json";

// const redditStreamCricketHtmlRe =
//   /<a href='(.*?)'>(Match[^]*?)<\/a>([^]*?Cricket[^]*?)[^]+?<\/a>/gm;

export type TThreadsDataType = {
  id: string;
  title: string;
  selfText: string;
  createdUTC: number;
};

export const getLiveCricketThreads = async () => {
  const response = await fetch(R_CRICKET_REDDIT_URL);
  if (!response.ok) throw new Error("Failed to connect with reddit");

  // const htmlString = await response.text();
  const json = await response.json();
  const matchThreads = json.data.children.filter(
    (sub: any) => sub.data.author === "CricketMatchBot"
  );
  const extractedData = matchThreads.map(({ data }: any) => ({
    title: data.title,
    selfText: data.selftext,
    id: data.id,
    createdUTC: data.created_utc,
  }));

  // // Match relevant stuff
  // const matches = htmlString.matchAll(redditStreamCricketHtmlRe);
  // const data = Array.from(matches).map((match) => ({
  //   url: match[1],
  //   title: match[2],
  // }));
  return extractedData;
};
