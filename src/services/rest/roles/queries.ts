import { supabase } from "@/lib/supabase";
import { useQuery } from "react-query";

const getRoleList = async () => {
  return await supabase.from("roles").select("id, name");
};

export const useGetRoleList = () =>
  useQuery({
    queryKey: ["roleList"],
    queryFn: getRoleList,
    refetchOnWindowFocus: false,
  });
