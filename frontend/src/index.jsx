/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import "solid-devtools";
import { Route, Router } from "@solidjs/router";

import App from "./App";
import TodoItems from "./pages/TodoItems";
import NotFound from "./pages/NotFound";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <Router root={App}>
      <Route path="/todoitems" component={TodoItems} />
      <Route path="*" component={NotFound}></Route>
    </Router>
  ),
  root,
);
