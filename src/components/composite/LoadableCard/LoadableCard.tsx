import { Card as AntCard, Skeleton, Typography } from "antd";
import { LoadableCardProps } from "./LoadableCard.props";

const { Link } = Typography;
const { Meta } = AntCard;

export const LoadableCard = (props: LoadableCardProps): JSX.Element => {
  return (
    <Skeleton
      loading={props.loading}
      active={props.active}
      style={{ ...props.skeletonStyle }}
    >
      <Link href={props.href} target={props.target}>
        <AntCard
          hoverable={props.hoverable}
          cover={props.cover}
          size={props.size}
          style={{ ...props.cardStyle }}
        >
          <Meta title={props.title} description={props.description} />
        </AntCard>
      </Link>
    </Skeleton>
  );
};
