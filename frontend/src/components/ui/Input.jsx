import React from "react";

// Input component
function Input({ className = "", type = "text", ...props }) {
  return (
    <input
      type={type}
      className={`form-control ${className}`}
      {...props}
    />
  );
}

export { Input };
