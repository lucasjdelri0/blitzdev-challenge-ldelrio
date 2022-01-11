import { ReactNode } from "react";

export type Route = {
  path: string;
  title: string;
};

export type MyRoutes = Route[];

export type HeaderProps = {
  backgroundColor?: string;
  tabColor?: string;
  repoHref?: string;
  selectedKeys?: string[];
  routes?: MyRoutes;
  badgeCount?: number;
  badgeIcon?: ReactNode;
  avatarImageSrc?: string;
};
