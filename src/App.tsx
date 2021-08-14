import styled from "styled-components";
import SearchPage from "./pages/search";
import ThreadPage from "./pages/thread";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-width: 100rem;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

function App() {
  return (
    <AppContainer>
      <SearchPage />
      {/* <ThreadPage /> */}
    </AppContainer>
  );
}

export default App;
