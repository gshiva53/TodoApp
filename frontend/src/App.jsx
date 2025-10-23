import { ApiContextProvider } from "./pages/ApiContextProvider";
import { ErrorBoundary } from "solid-js";

const App = (props) => {
  return (
    <ApiContextProvider>
      <ErrorBoundary
        fallback={(error) => {
          console.log(`${error}`);
          return <p>Error Occured: {error.message}</p>;
        }}
      >
        <div class="flex justify-center bg-slate-100 min-h-lvh">
          {props.children}
        </div>
      </ErrorBoundary>
    </ApiContextProvider>
  );
};

export default App;
