// compont/Input.js

import React from 'react';

const Input = (props) => {
  return (
    <input
      className="w-full p-2 mb-1 border border-gray-300 rounded"
      {...props}
    />
  );
};

export default Input;
