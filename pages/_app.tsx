import type { AppProps } from "next/app";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";

const GlobalStyle = createGlobalStyle`
  html,
  body {
  padding: 0;
  margin: 0;
  font-family: "Open Sans", sans-serif;

  background-color: #212528;
  color: white;
  scroll-behavior: smooth;

}

a {
   color: inherit;
}

* {
  box-sizing: border-box;
}

html {
  /* 1rem = 10px */
  font-size: 62.5%;
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
  padding: 1rem 1.5rem;
  max-width: 80rem;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 1rem;
    max-width: 100%;
  }
`;

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <GlobalWrapper className="nru">
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </GlobalWrapper>
    </QueryClientProvider>
  );
}
export default MyApp;
