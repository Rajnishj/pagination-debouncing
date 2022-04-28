import { debounce } from "lodash";
import React, { useState } from "react";

const Debounce2 = () => {
  const [word, setWord] = useState("");
  const [number, setNumber] = useState(0);
  const handletext = debounce((word) => {
    setWord(word);
  }, 1000);

  function a() {}

  a();
  return (
    <div>
      <input onChange={(e) => handletext(e.target.value)} type="text" />
      <br />
      <p>{word}</p>
      <button onClick={() => setNumber(number + 5)}>Click me</button>
      <h1>{number}</h1>
    </div>
  );
};

export default Debounce2;
