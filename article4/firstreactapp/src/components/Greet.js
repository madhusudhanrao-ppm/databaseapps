// code under src/components folder Greet.js
import React from "react";

export const Greet = (props) => {
  console.log(props);
  return (
    <div>
      Hello, My Name is {props.name} 
      my age is {props.age}, and I study{" "}
      {props.subject}
    </div>
  );
};
