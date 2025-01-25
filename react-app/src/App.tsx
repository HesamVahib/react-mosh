import Alert from "./components/Alert";
import Button from "./components/Button";
import { useState } from 'react';
import ListGroup from "./components/ListGroup";

function App() {

  const items = ["Item 1", "Item 2", "Item 3"];

  return (
    <>
      <ListGroup items={items} heading="Select an item" onSelectItem={(item) => console.log(item)} />
    </>
  );
}

export default App;
