import React from "react";

function Toast({ className = "", children, show = true, ...props }) {
  return (
    <div
      className={`toast ${show ? "show" : ""} ${className}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      {...props}
    >
      {children}
    </div>
  );
}

function ToastHeader({ className = "", children, closeButton, ...props }) {
  return (
    <div className={`toast-header ${className}`} {...props}>
      {children}
      {closeButton && (
        <button
          type="button"
          className="btn-close ms-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        />
      )}
    </div>
  );
}

function ToastBody({ className = "", children, ...props }) {
  return (
    <div className={`toast-body ${className}`} {...props}>
      {children}
    </div>
  );
}

export { Toast, ToastHeader, ToastBody };
