import React from 'react'

const Button = (props) => {
  return (
    <>
      <button
        id="Subscribe"
        style={{
          background: "#137DAA",
          color: "white",
          width: "15rem",
          height: "4rem",
          border: "none",
          borderRadius: "0.5rem",
        }}
      >
        {props.name}
      </button>
    </>
  );
}

export default Button