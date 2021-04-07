import React from "react";
import Body from "./components/Body";
import Container from "./components/Container";
import Header from "./components/Header";

import "./Application.css";

function Application() {
  return (
    <div className="App">
      <Container>
        <Header />
        <Body />
      </Container>
    </div>
  );
}

export default Application;
