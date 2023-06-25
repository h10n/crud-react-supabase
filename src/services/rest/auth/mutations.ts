import { supabase } from "@/lib/supabase";
import { useMutation } from "react-query";
import { TLogin } from "./types";

const authLogin = async ({ email, password }) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const useAuthLogin = () =>
  useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: TLogin) => await authLogin(data),
  });
