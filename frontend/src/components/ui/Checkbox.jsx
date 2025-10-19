import React from "react";
import { Check } from "lucide-react";

// Checkbox component
const Checkbox = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div className={`form-check ${className}`}>
      <input
        ref={ref}
        className="form-check-input"
        type="checkbox"
        {...props}
        id={props.id}
      />
      <label className="form-check-label" htmlFor={props.id}>
        {props.label}
      </label>
      {/* Optional Check Icon for custom display */}
      {props.checked && (
        <Check className="position-absolute" style={{ top: 0, left: 0, width: "1rem", height: "1rem" }} />
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
