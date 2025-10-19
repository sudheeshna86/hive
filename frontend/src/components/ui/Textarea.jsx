import React from "react";

function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`form-control ${className}`}
      style={{ minHeight: "80px" }}
      {...props}
    />
  );
}

export { Textarea };
