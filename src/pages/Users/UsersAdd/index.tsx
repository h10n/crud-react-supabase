import BasicButton from "@/components/Buttons/BasicButton";
import Form from "../components/Form";
import useUsersAdd from "./hooks";
import { Paper } from "@mui/material";

const UsersAdd = () => {
  const {
    methods: { navigate, handleAddNewUser },
  } = useUsersAdd();

  return (
    <section className="antialiased">
      <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 pb-4">
        <div className="w-full md:w-1/2">
          <h4 className="font-semibold">Tambah Users</h4>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <BasicButton
            variety="back"
            postText="to list"
            onClick={() => navigate("/users")}
          />
        </div>
      </div>

      <Paper
        sx={{
          p: 2,
          margin: "auto",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Form handleOnSubmit={handleAddNewUser}>
          <div className="flex justify-end mt-4">
            <BasicButton variety="save" type="submit" />
          </div>
        </Form>
      </Paper>
    </section>
  );
};

export default UsersAdd;
