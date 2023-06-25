import { supabase } from "@/lib/supabase";
import { useMutation } from "react-query";

const upsertProfile = async (data) => {
  return await supabase.from("profiles").upsert(data, { onConflict: "id" });
};

export const useUpsertProfile = () =>
  useMutation({
    mutationKey: ["upsertProfile"],
    mutationFn: async (data) => await upsertProfile(data),
  });
