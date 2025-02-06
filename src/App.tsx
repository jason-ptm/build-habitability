import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { Provider as ContextProvider } from "./context";
import { getInitData } from "./utils/injectInitiData";

function App() {
  return (
    <>
      <ContextProvider config={{ ...getInitData() }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
