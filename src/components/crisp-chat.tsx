"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("6543a973-3c94-4081-90e2-6716c028aa0b");
  }, []);

  return null;
};
