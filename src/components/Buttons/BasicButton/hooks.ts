import { TVariety, IBasicButton } from "./types";

const useBasicButton = (variety: TVariety) => {
  const initialData: IBasicButton = {
    color: "primary",
    title: "save",
    iconName: "Save",
  };

  let data = initialData;

  if (variety === "update") {
    data = {
      ...initialData,
      color: "warning",
      title: "update",
    };
  }

  if (variety === "add") {
    data = {
      ...initialData,
      color: "secondary",
      title: "add",
      iconName: "Add",
    };
  }

  if (variety === "edit") {
    data = {
      ...initialData,
      color: "success",
      title: "edit",
      iconName: "Edit",
    };
  }

  if (variety === "delete") {
    data = {
      ...initialData,
      color: "error",
      title: "delete",
      iconName: "Delete",
    };
  }

  if (variety === "back") {
    data = {
      ...initialData,
      color: "error",
      title: "back",
      iconName: "ArrowBack",
    };
  }

  return {
    data,
    methods: {},
  };
};

export default useBasicButton;
