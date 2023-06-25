import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const useNavbar = () => {
  const navigate = useNavigate();
  const logout = async ({ email, password }) => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login");
  };

  return {
    data: {},
    methods: { logout },
  };
};

export default useNavbar;
