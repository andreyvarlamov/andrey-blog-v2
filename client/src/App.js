import React from "react";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import store from "./redux/store";

import PostList from "./components/PostList";
import AppNavbar from "./components/AppNavbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <PostList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
