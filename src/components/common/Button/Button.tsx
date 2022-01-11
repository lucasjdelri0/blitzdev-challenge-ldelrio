import { Button as AntButton, ButtonProps } from "antd";

export const Button = (props: ButtonProps): JSX.Element => (
  <AntButton {...props}>{props.children}</AntButton>
);
