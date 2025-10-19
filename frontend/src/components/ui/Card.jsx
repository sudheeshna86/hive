import React from "react";

// Card container
function Card({ className = "", ...props }) {
  return (
    <div
      className={`card shadow-sm border rounded-xl p-4 bg-light text-dark d-flex flex-column gap-3 ${className}`}
      {...props}
    />
  );
}

// Card Header
function CardHeader({ className = "", ...props }) {
  return (
    <div
      className={`card-header d-flex justify-content-between align-items-start pb-3 ${className}`}
      {...props}
    />
  );
}

// Card Title
function CardTitle({ className = "", ...props }) {
  return (
    <div className={`fw-semibold mb-1 ${className}`} {...props} />
  );
}

// Card Description
function CardDescription({ className = "", ...props }) {
  return (
    <div className={`text-muted small ${className}`} {...props} />
  );
}

// Card Action (right-aligned element in header)
function CardAction({ className = "", ...props }) {
  return (
    <div className={`ms-auto ${className}`} {...props} />
  );
}

// Card Content
function CardContent({ className = "", ...props }) {
  return (
    <div className={`card-body p-0 ${className}`} {...props} />
  );
}

// Card Footer
function CardFooter({ className = "", ...props }) {
  return (
    <div className={`card-footer d-flex align-items-center pt-3 ${className}`} {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
