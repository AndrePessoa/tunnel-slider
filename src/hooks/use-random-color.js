import { useState } from "react";

const useRandomColor = () => {
  return useState(
    () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
  )[0];
};

export default useRandomColor;
