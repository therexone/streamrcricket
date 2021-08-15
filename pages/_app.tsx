import type { AppProps } from "next/app";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const GlobalStyle = createGlobalStyle`
  html,
  body {
  padding: 0;
  margin: 0;
  font-family: "Open Sans", sans-serif;

  background-color: #212528;
  color: white;

  overflow-x: hidden;
}

a {
   color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

html {
  /* 1rem = 10px */
  font-size: 62.5%;
}

.stats-markdown {
  color: #ffffffe1;
  h3 {
    font-size: 1.6rem;
    color: #fdbc2c;
    margin: 0;
  }
  p:last-of-type{
    background-color: #fdbb2c4b;
    padding: 0.4rem;
    border-radius: 0.5rem;
    color: #fdbc2c;
    text-align: center;

  }
  margin-bottom: 1.2rem;
}
`;

const theme = {
  colors: {
    bg: "#212528",
    bgLight: "#2a2e31",
    primary: "#fd8610;",
  },
};

const GlobalWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  max-width: 100rem;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <GlobalWrapper>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </GlobalWrapper>
    </QueryClientProvider>
  );
}
export default MyApp;
