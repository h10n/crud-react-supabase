import BasicDropdown from "@/components/Dropdowns/BasicDropdown";
import { BasicTextInput } from "@/components/TextInputs/BasicTextInput";
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import useUsersForm from "./hooks";
import { AlternateEmail, Check, Key } from "@mui/icons-material";
import BasicDatePicker from "@/components/DatePickers/BasicDatePicker";
import FileUpload from "@/components/Uploads/FileUpload";

export default function Form(props) {
  const { children, handleOnSubmit } = props;
  const {
    data: {
      // control,
      error,
      errors,
      roleList,
      isRoleListLoading,
    },
    methods: { handleSubmit, onSubmit, clearError, register },
  } = useUsersForm();

  return (
    <form
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <BasicTextInput
            fullWidth
            error={errors.email}
            helperText={errors.email?.message}
            id="firstName"
            name="first_name"
            // control={control}
            placeholder="First Name"
            label="First Name"
            required
            register={register}
            validation={{ required: "First name cannot be empty" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BasicTextInput
            fullWidth
            error={errors.email}
            helperText={errors.email?.message}
            id="lastName"
            name="last_name"
            // control={control}
            placeholder="Last Name"
            label="Last Name"
            required
            register={register}
            validation={{ required: "Last name cannot be empty" }}
          />
        </Grid>
        <Grid item xs={2}>
          <BasicDropdown
            id="gender"
            name="Gender"
            required
            options={[
              {
                value: "male",
                label: "Male",
              },
              {
                value: "female",
                label: "Female",
              },
            ]}
          />
        </Grid>
        <Grid item xs={2}>
          <BasicDatePicker />
        </Grid>
        <Grid item xs={2}>
          <BasicDropdown id="roles" name="Roles" required options={roleList} />
        </Grid>
        <Grid item xs={6}>
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
            required
            iconStart={
              <AlternateEmail sx={{ color: "#0089ff", fontSize: 20 }} />
            }
            register={register}
            validation={{ required: "Email cannot be empty" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
            required
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <BasicTextInput
            fullWidth
            error={errors.password}
            helperText={errors.password?.message}
            type="password"
            id="passwordConfirmation"
            name="password_confirmation"
            // control={control}
            placeholder="••••••••"
            label="Password"
            required
            iconStart={<Check sx={{ color: "#0089ff", fontSize: 20 }} />}
            register={register}
            validation={{
              required: "Password cannot be empty",
              minLength: {
                value: 3,
                message: "At least 3 letters required",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BasicTextInput
            fullWidth
            error={errors.email}
            helperText={errors.email?.message}
            id="website"
            name="website"
            // control={control}
            placeholder="Website"
            label="Website"
            register={register}
            validation={{ required: "Website name cannot be empty" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FileUpload name="Photo" />
        </Grid>
      </Grid>
      {children}
    </form>
  );
}
