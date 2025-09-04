"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

interface TodoErrorProps {
  error?: Error;
}

export default function TodoError({ error }: TodoErrorProps) {
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (error && !hasShownToast.current) {
      console.error("Todo Error Details:", error);
      toast.error("发生错误，请刷新重试");
      hasShownToast.current = true;
    }
  }, [error]);

  return null;
}
