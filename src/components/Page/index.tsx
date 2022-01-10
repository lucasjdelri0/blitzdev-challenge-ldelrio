import { ReactNode } from "react";
import Header from "../Header";
import "./Page.css";

const Page = ({
  children,
  head,
}: {
  children: ReactNode;
  head?: string;
}): JSX.Element => (
  <>
    {head && (
      <head>
        <title>{head}</title>
      </head>
    )}
    <div className="pageContainer">
      <Header />
      {children}
    </div>
  </>
);

export default Page;
