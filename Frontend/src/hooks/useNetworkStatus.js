import { useEffect } from "react";
import { toast } from "react-toastify";

const useNetworkStatus = () => {
  useEffect(() => {
    const handleOnline = () => {
      toast.success("You are back online 🟢");
    };

    const handleOffline = () => {
      toast.error("You are offline 🔴");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
};

export default useNetworkStatus;
