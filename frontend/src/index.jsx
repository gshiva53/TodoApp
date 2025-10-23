/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import "solid-devtools";
import { Route, Router } from "@solidjs/router";

import App from "./App";
import TodoItems from "./pages/TodoItems";
import NotFound from "./pages/NotFound";
import login from "./pages/identity/login";

const root = document.getElementById("root");

export const API_URL = "https://todo.guptashiva.dev/backend/todoitems/";
// export const API_URL = "https://todo.guptashiva.dev/todoitems/";
// export const API_URL_DEV = "http://192.168.4.24:5000/todoitems/";

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <Router root={App}>
      <Route path="/todoitems" component={TodoItems} />
      <Route path="/login" component={login} />
      <Route path="*" component={NotFound}></Route>
    </Router>
  ),
  root,
);
