import React from "react";

// Badge component
function Badge({ className = "", variant = "default", asChild = false, children, ...props }) {
  const Comp = asChild ? "span" : "span"; // Bootstrap doesn’t need Slot, kept span

  // Variant classes mapping
  let variantClass = "badge bg-primary text-white"; // default
  switch (variant) {
    case "secondary":
      variantClass = "badge bg-secondary text-white";
      break;
    case "destructive":
      variantClass = "badge bg-danger text-white";
      break;
    case "outline":
      variantClass = "badge border border-secondary text-secondary bg-transparent";
      break;
    default:
      variantClass = "badge bg-primary text-white";
  }

  return (
    <Comp className={`d-inline-flex align-items-center justify-content-center rounded px-2 py-1 text-xs fw-medium ${variantClass} ${className}`} {...props}>
      {children}
    </Comp>
  );
}

export { Badge };
