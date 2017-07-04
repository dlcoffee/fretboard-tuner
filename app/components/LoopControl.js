import React from 'react';

const LoopControl = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick}>{ children }</button>
  );
};

export default LoopControl;