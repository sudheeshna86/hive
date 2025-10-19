import React from "react";

function Progress({ value = 0, className = "", ...props }) {
  return (
    <div className={`progress ${className}`} {...props}>
      <div
        className="progress-bar bg-primary"
        role="progressbar"
        style={{ width: `${value}%` }}
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  );
}

export { Progress };
