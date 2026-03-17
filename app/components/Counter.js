"use client";

import { useState } from "react";

export default function Counter({ users }) {
  const [counter, setCounter] = useState(0);

  console.log(users);

  return (
    <button onClick={() => setCounter((count) => count + 1)}>{counter}</button>
  );
}
