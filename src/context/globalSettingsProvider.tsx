import React, {
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";

type TGlobalSettingsState = {
  refreshInterval: 30000 | 40000 | 50000;
  setRefreshInterval: Dispatch<SetStateAction<30000 | 40000 | 50000>>;
  commentsType: "new" | "top";
  setCommentsType: Dispatch<SetStateAction<"new" | "top">>;
  showMatchStats: boolean;
  setShowMatchStats: Dispatch<SetStateAction<boolean>>;
};

export const GlobalSettingsContext = createContext<null | TGlobalSettingsState>(
  null
);

const GlobalSettingsProvider = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  const [refreshInterval, setRefreshInterval] = useLocalStorageState<
    TGlobalSettingsState["refreshInterval"]
  >("refreshInterval", 30000);

  const [commentsType, setCommentsType] = useLocalStorageState<
    TGlobalSettingsState["commentsType"]
  >("commentsType", "new");

  const [showMatchStats, setShowMatchStats] = useLocalStorageState<boolean>(
    "showMatchStats",
    true
  );

  const value = {
    refreshInterval,
    setRefreshInterval,
    commentsType,
    setCommentsType,
    showMatchStats,
    setShowMatchStats,
  };

  return (
    <GlobalSettingsContext.Provider value={value} {...props}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export default GlobalSettingsProvider;
