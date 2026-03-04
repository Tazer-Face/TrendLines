import React from "react";
import { Container } from "react-bootstrap";
import AddStrategy from "./AddStrategy.jsx";
import DisplayStrategy from "./DisplayStrategy.jsx";

const Strategy = () => {
  return (
    <div style={{ backgroundColor: "#f9fafb" }}>
      <Container> 
        <AddStrategy />
        <DisplayStrategy />
      </Container>
    </div>
  );
};

export default Strategy;
