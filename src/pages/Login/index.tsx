import Anchor from "@/components/Anchor";
import BasicButton from "@/components/Buttons/BasicButton";
import BasicCheckbox from "@/components/Checkboxes/BasicCheckbox";
import { AlternateEmail, Key } from "@mui/icons-material";
import useLogin from "./hooks";
// import FormTextInput from "@/components/TextInputs/FormTextInput";
import AlertSnackbar from "@/components/Snackbars/AlertSnackbar";
import { BasicTextInput } from "@/components/TextInputs/BasicTextInput";

const Login = () => {
  const {
    data: {
      // control,
      error,
      errors,
    },
    methods: { handleSubmit, onSubmit, clearError, register },
  } = useLogin();

  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <BasicTextInput
          fullWidth
          error={errors.email}
          helperText={errors.email?.message}
          type="email"
          id="email"
          name="email"
          // control={control}
          placeholder="name@company.com"
          label="Email"
          iconStart={<AlternateEmail sx={{ color: "#0089ff", fontSize: 20 }} />}
          register={register}
          validation={{ required: "Email cannot be empty" }}
        />
        <BasicTextInput
          fullWidth
          error={errors.password}
          helperText={errors.password?.message}
          type="password"
          id="password"
          name="password"
          // control={control}
          placeholder="••••••••"
          label="Password"
          iconStart={<Key sx={{ color: "#0089ff", fontSize: 20 }} />}
          register={register}
          validation={{
            required: "Password cannot be empty",
            minLength: {
              value: 3,
              message: "At least 3 letters required",
            },
          }}
        />
        <div className="flex items-center justify-between">
          <BasicCheckbox id="remember-me" label="Remember me" />
          <Anchor label="Forgot password?" href="https://www.google.com" />
        </div>
        <BasicButton
          type="submit"
          title="Sign in"
          icon="LockOpen"
          className="w-full"
        />
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <Anchor label="Sign up" href="https://www.google.com" />
        </p>
      </form>

      <AlertSnackbar
        severity="error"
        message={error}
        isOpen={!!error}
        close={clearError}
      />
    </>
  );
};

export default Login;
