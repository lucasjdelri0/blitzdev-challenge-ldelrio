import { ReactNode } from "react";
import { Row, Col } from "antd";

const ContentWrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <Row style={{ justifyContent: "center" }}>
    <Col
      xl={{ span: 16 }}
      lg={{ span: 18 }}
      md={{ span: 20 }}
      sm={{ span: 22 }}
      xs={{ span: 22 }}
    >
      {children}
    </Col>
  </Row>
);

export default ContentWrapper;
