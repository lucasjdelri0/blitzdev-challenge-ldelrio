import { ReactNode } from "react";
import { TitleWrapperProps } from "./TitleWrapper.props";
import "./TitleWrapper.css";

export const TitleWrapper = (props: TitleWrapperProps): JSX.Element => (
  <div className="headingWrapperContainer">{props.children}</div>
);
