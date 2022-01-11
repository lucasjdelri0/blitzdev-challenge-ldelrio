import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "../../../components/common/Button";

export default {
  title: "Example/Common/Button",
  component: Button,
  argTypes: {
    type: {
      options: ["default", "primary", "ghost", "dashed", "link", "text"],
      control: { type: "select" },
    },
    size: {
      options: ["small", "middle", "large"],
      control: { type: "select" },
    },
    shape: {
      options: ["default", "circle", "round"],
      control: { type: "select" },
    },
    href: {},
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Default",
};

export const Primary = Template.bind({});
Primary.args = {
  type: "primary",
  children: "Primary",
};

export const Small = Template.bind({});
Small.args = {
  type: "primary",
  size: "small",
  children: "Small",
};

export const Large = Template.bind({});
Large.args = {
  type: "primary",
  size: "large",
  children: "Large",
};

export const Disabled = Template.bind({});
Disabled.args = {
  type: "primary",
  disabled: true,
  children: "Disabled",
};

export const Loading = Template.bind({});
Loading.args = {
  type: "primary",
  loading: true,
  children: "Loading",
};

export const Danger = Template.bind({});
Danger.args = {
  type: "primary",
  danger: true,
  children: "Danger",
};
