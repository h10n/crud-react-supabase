import { useBoundStore } from "@/store/useBoundStore";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const useSession = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  const setUser = useBoundStore((state) => state.setUser);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user || null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
    isLoading,
  };
};

export default useSession;
