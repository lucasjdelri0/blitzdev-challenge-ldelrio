import { CardSize } from "antd/lib/card";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";

export type LoadableCardProps = {
  active?: boolean;
  loading?: boolean;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  cover?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  size?: CardSize;
  hoverable?: boolean;
  cardStyle?: React.CSSProperties;
  skeletonStyle?: React.CSSProperties;
};
