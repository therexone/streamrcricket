/* eslint-disable react/display-name */
import type { NextPageContext } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const MatchThreads = dynamic(() => import("../src/containers/matches"));
import {
  getLiveCricketThreads,
  TThreadsDataType,
} from "../src/utils/fetchLiveCricketThreads";
import Loading from "../src/components/loading";

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
