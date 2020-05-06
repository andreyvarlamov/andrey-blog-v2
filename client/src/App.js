import React from "react";
import { Container } from "reactstrap";

import PostList from "./components/PostList";
import AppNavbar from "./components/AppNavbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <PostList />
      </Container>
    </div>
  );
}

export default App;
