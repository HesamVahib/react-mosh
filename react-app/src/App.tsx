
import React, { useState } from 'react';
import ExpandableText from './components/ExpandableText';

function App() {
  

  return (
    <>
      <ExpandableText maxLength={100}>
        Hello World
      </ExpandableText>
    </>
  );
}

export default App;
