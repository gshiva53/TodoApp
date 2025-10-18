import { ApiContextProvider } from "./pages/ApiContextProvider";

const App = (props) => {
  return (
    <ApiContextProvider>
      <div class="flex justify-center bg-slate-100">{props.children}</div>
    </ApiContextProvider>
  );
};

export default App;
