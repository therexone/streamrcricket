const R_CRICKET_REDDIT_URL = "https://www.reddit.com/r/Cricket.json";

export type TThreadsDataType = {
  id: string;
  title: string;
  selfText: string;
  createdUTC: number;
};

export const getLiveCricketThreads = async () => {
  const response = await fetch(R_CRICKET_REDDIT_URL);
  if (!response.ok) throw new Error("Failed to connect with reddit");

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

  return extractedData;
};
