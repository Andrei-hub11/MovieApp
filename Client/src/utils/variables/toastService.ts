import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ToastService {
  static showError(message: string | string[], options?: ToastOptions) {
    if (!Array.isArray(message)) {
      toast.error(message, options);
    }
    for (const m of message) {
      toast.error(m, options);
    }
  }

  static showSuccess(message: string, options?: ToastOptions) {
    toast.success(message, options);
  }
}

export default ToastService;
