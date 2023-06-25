import * as Icons from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

import { IBasicButton, TIconComponent } from "./types";

import useBasicButton from "./hooks";

const BasicButton = (props: IBasicButton) => {
  const {
    title = "",
    color = "",
    icon = "",
    postText = "",
    postIcon = "",
    isLoading = false,
    onClick = () => {},
    variety = "custom",
  } = props;

  const {
    data: { color: selectedColor, iconName = "Save", title: selectedTitle },
  } = useBasicButton(variety);

  const IconComponent: TIconComponent = (props) => {
    const { iconName } = props;
    const Icon = Icons[iconName];
    return <Icon {...props} />;
  };

  return (
    <LoadingButton
      color={color || selectedColor}
      loading={isLoading}
      onClick={onClick}
      startIcon={<IconComponent iconName={icon || iconName} />}
      endIcon={
        postIcon && (
          <IconComponent iconName={postIcon} className="h-4 w-4 ml-1.5" />
        )
      }
      variant="contained"
      {...props}
    >
      {`${title || selectedTitle} ${postText}`}
    </LoadingButton>
  );
};

export default BasicButton;
