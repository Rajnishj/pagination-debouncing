import React, { useState } from "react";

const Debounce = () => {
  const [value, setValue] = useState("");
  const debounceFunc = (cb, delay) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };
  const onChangeHandle = debounceFunc((e) => {
    setValue(e.target.value);
  }, 1000);
  return (
    <div>
      <input onChange={onChangeHandle} type="text" />
      <p>{value}</p>
    </div>
  );
};

export default Debounce;
