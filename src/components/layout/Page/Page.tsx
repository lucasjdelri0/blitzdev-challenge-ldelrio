import { BellOutlined } from "@ant-design/icons";
import Header from "../Header";
import { PageProps } from "./Page.props";
import "./Page.css";

export const Page = (props: PageProps): JSX.Element => (
  <>
    {props.head && (
      <head>
        <title>{props.head}</title>
      </head>
    )}
    <div className="pageContainer">
      <Header
        repoHref="https://github.com/lucasjdelri0/blitzdev-challenge-ldelrio"
        badgeCount={7}
        badgeIcon={<BellOutlined />}
        avatarImageSrc="https://joeschmoe.io/api/v1/random"
      />
      {props.children}
    </div>
  </>
);
