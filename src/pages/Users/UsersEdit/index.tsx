import BasicButton from "@/components/Buttons/BasicButton";
import Form from "../components/Form";

const UsersEdit = () => {
  return (
    <section className="antialiased">
      <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 pb-4">
        <div className="w-full md:w-1/2">
          <h4 className="font-semibold">Edit Users</h4>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <BasicButton variety="back" postText="to list" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="overflow-x-auto mx-4 pb-4">
          <Form />
          <div className="flex justify-end">
            <BasicButton variety="update" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsersEdit;
