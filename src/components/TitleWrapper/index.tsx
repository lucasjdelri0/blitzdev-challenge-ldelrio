import { ReactNode } from "react";
import "./TitleWrapper.css";

const TitleWrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <div className="headingWrapperContainer">{children}</div>
);

export default TitleWrapper;
