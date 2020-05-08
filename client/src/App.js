import React, { useEffect } from "react";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import store from "./redux/store";

import PostList from "./components/PostList";
import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";

import { loadUser } from "./redux/actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <PostList />
        </Container>
        <AppFooter />
      </div>
    </Provider>
  );
}

export default App;
