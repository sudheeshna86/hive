import React from "react";
import { Toast, ToastHeader, ToastBody } from "../components/ui/Toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5000; // 5 sec (Bootstrap-friendly)

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const listeners = [];
let memoryState = { toasts: [] };

function dispatch(action) {
  switch (action.type) {
    case "ADD_TOAST":
      memoryState = {
        ...memoryState,
        toasts: [action.toast, ...memoryState.toasts].slice(0, TOAST_LIMIT),
      };
      break;
    case "REMOVE_TOAST":
      memoryState = {
        ...memoryState,
        toasts: memoryState.toasts.filter((t) => t.id !== action.toastId),
      };
      break;
    default:
      break;
  }

  listeners.forEach((listener) => listener(memoryState));
}

function toast({ title, description, action }) {
  const id = genId();

  const dismiss = () => dispatch({ type: "REMOVE_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: { id, title, description, action, dismiss },
  });

  setTimeout(dismiss, TOAST_REMOVE_DELAY);

  return { id, dismiss };
}

function useToast() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "REMOVE_TOAST", toastId }),
  };
}

export { useToast, toast };
