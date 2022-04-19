import Head from "next/head";
import { useEffect } from "react";
import Thread from "../../src/containers/thread";
import GlobalSettingsProvider from "../../src/context/globalSettingsProvider";

const ThreadPage = () => {
  useEffect(() => {
    const heading = document.getElementsByTagName("h3")[0];
    if (heading) {
      document.title = 'Thread - ' + heading.innerText;
    }
  }, []);
  return (
    <>
      <GlobalSettingsProvider>
        <Thread />
      </GlobalSettingsProvider>
    </>
  );
};

export default ThreadPage;
