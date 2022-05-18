import React from "react";

export const Places = (props) => {
  const {name} = props;

  return (
    <div className="results-container">
      <h3 className="results-name" value={name} onClick={props.onClick}>{name}</h3>
    </div>
  );
}
