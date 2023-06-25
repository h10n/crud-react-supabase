import { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { SvgIconComponent } from "@mui/icons-material";
import * as Icons from "@mui/icons-material";

export type TVariety = "save" | "update" | "cancel" | "custom";
export type TIcon = SvgIconComponent;
export type TIconNames = keyof typeof Icons;
export type TIconProps = {
  iconName: TIconNames;
};
export type TIconComponent = React.FC<TIconProps>;
export interface IBasicButton extends LoadingButtonProps {
  icon?: TIconNames;
  isLoading?: boolean;
  variety?: TVariety;
  iconName?: TIconNames;
}
