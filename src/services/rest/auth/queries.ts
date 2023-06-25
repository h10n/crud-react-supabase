import { supabase } from "@/lib/supabase";
import { useQuery } from "react-query";

const getAuthUser = async () => {
  return await supabase.auth.getUser();
};
const getSession = async () => {
  return await supabase.auth.getSession();
};

export const useGetAuthUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: getAuthUser,
    refetchOnWindowFocus: false,
  });

export const useGetSession = () =>
  useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    refetchOnWindowFocus: false,
  });
