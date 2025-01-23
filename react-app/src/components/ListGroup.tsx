function ListGroup() {
    const items = [
        "An item",
        "A second item",
        "A third item",
        "A fourth item",
        "And a fifth one"
        ];

  return (
    <>
    <h1>List Group</h1>
    <ul className="list-group">
      {items.map((item, index) => (
        <li key={index} className="list-group-item">{item}</li>)
    )}
    </ul>
    </>
  );
}

export default ListGroup;
