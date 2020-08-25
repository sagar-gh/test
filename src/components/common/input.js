import React from "react";

const Input = ({ name, label, onChange, ...rest }) => {
  return (
    <div className="form-group" style={{ width: 400 }}>
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" onChange={({ target }) => onChange(target.value)} />
    </div>
  );
};

export default Input;
