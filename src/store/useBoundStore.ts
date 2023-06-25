import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import { devtools } from "zustand/middleware";

export const useBoundStore = create(
  devtools((...a) => ({
    ...createAuthSlice(...a),
  }))
);
