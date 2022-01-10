import { Layout, Space, Menu, Badge, Button, Avatar, Typography } from "antd";
import { BellOutlined, GithubOutlined } from "@ant-design/icons";
import "./Header.css";

const { Header: AntHeader } = Layout;
const { Link: AntLink } = Typography;

const Header = (): JSX.Element => (
  <AntHeader className="headerContainer">
    <AntLink
      href="https://github.com/lucasjdelri0/blitzdev-challenge-ldelrio"
      target="_blank"
      className="ghLink"
    >
      <GithubOutlined className="headerLogo" />
    </AntLink>

    <Space align="center">
      <Badge count={8}>
        <Button
          icon={<BellOutlined />}
          shape="circle"
          size="small"
          type="link"
        />
      </Badge>
      <Button
        icon={
          <Avatar
            alt="Avatar"
            src="https://randomuser.me/api/portraits/women/72.jpg"
          />
        }
        type="link"
      />
    </Space>
  </AntHeader>
);

export default Header;
