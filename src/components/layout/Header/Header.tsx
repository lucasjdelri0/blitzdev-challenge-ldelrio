import { Layout, Space, Menu, Badge, Button, Avatar, Typography } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { HeaderProps } from "./Header.props";
import "./Header.css";

const { Header: AntHeader } = Layout;
const { Link: AntLink } = Typography;

export const Header = (props: HeaderProps): JSX.Element => (
  <AntHeader
    className="headerContainer"
    style={{ backgroundColor: props.backgroundColor }}
  >
    {props.repoHref && (
      <AntLink href={props.repoHref} target="_blank" className="ghLink">
        <GithubOutlined className="headerLogo" />
      </AntLink>
    )}

    {props.routes && (
      <Menu
        mode="horizontal"
        selectedKeys={props.selectedKeys}
        className="routesMenu"
        style={{
          backgroundColor: props.backgroundColor,
        }}
      >
        {props.routes.map(({ path, title }) => (
          <Menu.Item key={path}>
            <AntLink href={path} style={{ color: props.tabColor }}>
              {title}
            </AntLink>
          </Menu.Item>
        ))}
      </Menu>
    )}

    <Space align="center">
      {props.badgeIcon && (
        <Badge count={props.badgeCount}>
          <Button
            icon={props.badgeIcon}
            shape="circle"
            size="small"
            type="link"
          />
        </Badge>
      )}
      {props.avatarImageSrc && <Avatar src={props.avatarImageSrc} />}
    </Space>
  </AntHeader>
);
