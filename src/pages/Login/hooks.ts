import { useForm, SubmitHandler } from "react-hook-form";
// import { useAuthLogin, useGetAuthUser } from "@/services/rest/auth";
import { TLogin } from "./types";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useBoundStore } from "@/store/useBoundStore";
import { useState } from "react";

const useLogin = () => {
  const [error, setError] = useState("");

  const {
    // control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>();
  const navigate = useNavigate();

  const setUser = useBoundStore((state) => state.setUser);
  // const user = useGetAuthUser();
  // const login = useAuthLogin();

  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Incorrect email or password!");
      throw error;
    }
    setUser(data);
    navigate("/dashboard");
  };

  const onSubmit: SubmitHandler<TLogin> = async (data) => await login(data);
  const clearError = () => setError("");
  // if (user.isSuccess && user?.data?.data?.user) {
  //   navigate("/dashboard");
  // }

  return {
    data: {
      // control,
      error,
      errors,
    },
    methods: { register, handleSubmit, onSubmit, clearError },
  };
};

export default useLogin;
