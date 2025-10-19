import React, { forwardRef } from "react";

// Alert component
const Alert = forwardRef(({ className = "", variant = "default", children, ...props }, ref) => {
  // Variant-based classes
  let variantClass = "alert bg-light text-dark border";
  if (variant === "destructive") {
    variantClass = "alert alert-danger";
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={`position-relative w-100 rounded p-3 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
Alert.displayName = "Alert";

// Alert Title
const AlertTitle = forwardRef(({ className = "", children, ...props }, ref) => (
  <h5 ref={ref} className={`mb-1 fw-bold ${className}`} {...props}>
    {children}
  </h5>
));
AlertTitle.displayName = "AlertTitle";

// Alert Description
const AlertDescription = forwardRef(({ className = "", children, ...props }, ref) => (
  <div ref={ref} className={`small ${className}`} {...props}>
    {children}
  </div>
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
