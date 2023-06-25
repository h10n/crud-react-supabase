import { useForm, SubmitHandler } from "react-hook-form";
import { TUsersForm } from "./types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetRoleList } from "@/services/rest/roles";
import { useUpsertProfile } from "@/services/rest/profiles";

const useUsersForm = () => {
  const [error, setError] = useState("");
  const { data: roleData, isLoading: isRoleListLoading } = useGetRoleList();
  const {
    // control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUsersForm>();

  const { data, mutate, error: validationError, isError } = useUpsertProfile();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TUsersForm> = async (data) => mutate(data);

  const clearError = () => setError("");
  return {
    data: {
      // control,
      error,
      errors,
      roleList: roleData?.data?.map((roleData) => ({
        value: roleData.id,
        label: roleData.name,
      })),
      isRoleListLoading,
    },
    methods: { register, handleSubmit, onSubmit, clearError },
  };
};

export default useUsersForm;
