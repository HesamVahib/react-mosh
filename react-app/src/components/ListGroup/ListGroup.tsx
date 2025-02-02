import { useState } from "react";
import styles from './ListGroup.css';
import styled from 'styled-components';

interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

const List = styled.ul`
list-style: none;
padding: 0;
cursor: pointer;
`;



function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {

    const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
    <h1>{heading}</h1>
    <List>
      {items.map((item, index) => (
        <li key={index} className={selectedIndex == index ? "list-group-item active" : "list-group-item"}
            onClick={() => {
              selectedIndex === index ? setSelectedIndex(-1) : setSelectedIndex(index);
              onSelectItem(item);
            }
            }>
              {item}
        </li>)
    )}
    </List>
    </>
  );
}

export default ListGroup;
