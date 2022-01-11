import { ContentWrapperProps } from "./ContentWrapper.props";
import { Row, Col } from "antd";

export const ContentWrapper = (props: ContentWrapperProps): JSX.Element => (
  <Row style={{ justifyContent: "center" }}>
    <Col
      xl={{ span: 16 }}
      lg={{ span: 18 }}
      md={{ span: 20 }}
      sm={{ span: 22 }}
      xs={{ span: 22 }}
    >
      {props.children}
    </Col>
  </Row>
);
