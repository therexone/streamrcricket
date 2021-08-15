import type { NextPageContext } from "next";
import Head from "next/head";
import MatchThreads from "../src/components/matchThreads";
import {
  getLiveCricketThreads,
  TThreadsDataType,
} from "../src/utils/fetchLiveCricketThreads";

const Home = ({ data }: { data: TThreadsDataType[] }) => {
  return (
    <div>
      <Head>
        <title>stream r/Cricket</title>
        <meta name="description" content="Live r/Cricket threads" />
      </Head>
      <MatchThreads threads={data} />
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const data = await getLiveCricketThreads();
  return {
    props: {
      data: data,
    },
  };
}

export default Home;
