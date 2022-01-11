import { ReactNode, HTMLAttributeAnchorTarget } from "react";
import { Card as AntCard, Skeleton, Typography } from "antd";
import { CardSize } from "antd/lib/card";

const { Link } = Typography;
const { Meta } = AntCard;

const LoadableCard = ({
  active = false,
  loading = false,
  href,
  target,
  cover,
  title,
  size,
  hoverable = true,
  cardStyle,
}: {
  active?: boolean;
  loading?: boolean;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  cover?: ReactNode;
  title?: ReactNode;
  size?: CardSize;
  hoverable?: boolean;
  cardStyle?: React.CSSProperties;
}): JSX.Element => {
  return (
    <Skeleton loading={loading} active={active}>
      <Link href={href} target={target}>
        <AntCard
          hoverable={hoverable}
          cover={cover}
          size={size}
          style={{ ...cardStyle }}
        >
          <Meta title={title} />
        </AntCard>
      </Link>
    </Skeleton>
  );
};

export default LoadableCard;
