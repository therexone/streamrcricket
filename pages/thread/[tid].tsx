import Thread from "../../src/containers/thread";
import GlobalSettingsProvider from "../../src/context/globalSettingsProvider";

const ThreadPage = () => {
  return (
    <GlobalSettingsProvider>
      <Thread />
    </GlobalSettingsProvider>
  );
};

export default ThreadPage;
