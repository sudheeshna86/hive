import React from "react";

// Button component
function Button({ className = "", variant = "default", size = "default", asChild = false, children, ...props }) {
  const Comp = "button"; // No Slot needed in Bootstrap

  // Variant mapping
  let variantClass = "btn btn-primary"; // default
  switch (variant) {
    case "destructive":
      variantClass = "btn btn-danger";
      break;
    case "outline":
      variantClass = "btn btn-outline-secondary";
      break;
    case "secondary":
      variantClass = "btn btn-secondary";
      break;
    case "ghost":
      variantClass = "btn btn-light";
      break;
    case "link":
      variantClass = "btn btn-link";
      break;
    default:
      variantClass = "btn btn-primary";
  }

  // Size mapping
  let sizeClass = "";
  switch (size) {
    case "sm":
      sizeClass = "btn-sm";
      break;
    case "lg":
      sizeClass = "btn-lg";
      break;
    case "icon":
      sizeClass = "btn p-2"; // square icon button
      break;
    default:
      sizeClass = ""; // default medium size
  }

  return (
    <Comp className={`d-inline-flex align-items-center justify-content-center gap-2 ${variantClass} ${sizeClass} ${className}`} {...props}>
      {children}
    </Comp>
  );
}

export { Button };
