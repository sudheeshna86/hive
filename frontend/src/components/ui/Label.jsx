import React from "react";

// Label component
function Label({ className = "", children, htmlFor, ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`form-label d-flex align-items-center gap-2 fw-medium ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}

export { Label };
