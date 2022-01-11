import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Image } from "antd";

import LoadableCard from "../../../components/composite/LoadableCard";

export default {
  title: "Example/Composite/LoadableCard",
  component: LoadableCard,
  argTypes: {
    size: { control: "select" },
    hoverable: { control: "boolean" },
    cardStyle: { control: "object" },
  },
} as ComponentMeta<typeof LoadableCard>;

const Template: ComponentStory<typeof LoadableCard> = (args) => (
  <LoadableCard {...args} />
);

export const Covered = Template.bind({});
Covered.args = {
  cover: (
    <Image
      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      preview={false}
    />
  ),
  title: "Europe Street beat",
  description: "www.instagram.com",
  cardStyle: { width: 240 },
  skeletonStyle: { width: 240 },
};

export const Uncovered = Template.bind({});
Uncovered.args = {
  title: "Card title",
  description: "www.instagram.com",
  cardStyle: { width: 240 },
  skeletonStyle: { width: 240 },
};

export const Loading = Template.bind({});
Loading.args = {
  cover: (
    <Image
      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      preview={false}
    />
  ),
  title: "Europe Street beat",
  description: "www.instagram.com",
  cardStyle: { width: 240 },
  skeletonStyle: { width: 240 },
  loading: true,
  active: true,
};

export const Hoverable = Template.bind({});
Hoverable.args = {
  title: "Hoverable card",
  description: "I'm a hoverable card",
  cardStyle: { width: 240 },
  skeletonStyle: { width: 240 },
  hoverable: true,
};
