import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BellOutlined } from "@ant-design/icons";
import Header from "../../../components/layout/Header";

export default {
  title: "Example/Layout/Header",
  component: Header,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Light = Template.bind({});
Light.args = {
  repoHref: "https://github.com/lucasjdelri0/blitzdev-challenge-ldelrio",
  badgeCount: 7,
  badgeIcon: <BellOutlined />,
  avatarImageSrc: "https://joeschmoe.io/api/v1/random",
};

export const LightWithTabs = Template.bind({});
LightWithTabs.args = {
  repoHref: "https://github.com/lucasjdelri0/blitzdev-challenge-ldelrio",
  badgeCount: 7,
  badgeIcon: <BellOutlined />,
  avatarImageSrc: "https://joeschmoe.io/api/v1/random",
  routes: [
    {
      path: "https://liquidcollectibles.io/collection/0x0d464bdde2301c30871bb4c29bb7dd935f5a985c",
      title: "Liquid Monsters",
    },
    {
      path: "https://liquidcollectibles.io/collection/0x6afc012783e3a6ef8c5f05f8eee2edef6a052ec4",
      title: "Non Fungible Apes",
    },
  ],
};

export const Dark = Template.bind({});
Dark.args = {
  backgroundColor: "black",
  repoHref: "https://github.com/lucasjdelri0/blitzdev-challenge-ldelrio",
  badgeCount: 7,
  badgeIcon: <BellOutlined />,
  avatarImageSrc: "https://joeschmoe.io/api/v1/random",
};

export const DarkWithTabs = Template.bind({});
DarkWithTabs.args = {
  backgroundColor: "black",
  repoHref: "https://github.com/lucasjdelri0/blitzdev-challenge-ldelrio",
  badgeCount: 7,
  badgeIcon: <BellOutlined />,
  avatarImageSrc: "https://joeschmoe.io/api/v1/random",
  routes: [
    {
      path: "https://liquidcollectibles.io/collection/0x0d464bdde2301c30871bb4c29bb7dd935f5a985c",
      title: "Liquid Monsters",
    },
    {
      path: "https://liquidcollectibles.io/collection/0x6afc012783e3a6ef8c5f05f8eee2edef6a052ec4",
      title: "Non Fungible Apes",
    },
  ],
  tabColor: "#1890ff",
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: "Button",
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   label: "Button",
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   label: "Button",
// };
