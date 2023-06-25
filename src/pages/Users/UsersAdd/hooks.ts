import { supabase } from "@/lib/supabase";
import { useUpsertProfile } from "@/services/rest/profiles";
import { useNavigate } from "react-router-dom";

const useUsersAdd = () => {
  const navigate = useNavigate();

  const { data, mutate, error: validationError, isError } = useUpsertProfile();

  const onSubmit: SubmitHandler<TUsersForm> = async (data) => mutate(data);

  const handleAddNewUser = async (payload) => {
    const { email, password, first_name, last_name, birth_date, gender } =
      payload;

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    const user = data.user;
    if (user) {
      await onSubmit({
        id: user.id,
        email,
        first_name,
        last_name,
        birth_date,
        gender,
        full_name: `${first_name} ${last_name}`,
      });
    }
  };

  return {
    data: {},
    methods: {
      handleAddNewUser,
      navigate,
    },
  };
};

export default useUsersAdd;
