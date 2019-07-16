import React from 'react';

const CustomDiv = props => (
  <span
    onClick={e => {
      props.onClick(props.id);
    }}
  >
    {props.children}
  </span>
);

export default CustomDiv;
