import React from "react";

function Select({ className = "", children, ...props }) {
  return (
    <select className={`form-select ${className}`} {...props}>
      {children}
    </select>
  );
}

function SelectOption({ value, children, ...props }) {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
}

export { Select, SelectOption };
