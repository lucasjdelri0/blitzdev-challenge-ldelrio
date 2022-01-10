import React from "react";
import { Button, Typography, Space } from "antd";
import Page from "./components/Page";
import TitleWrapper from "./components/TitleWrapper";
import ContentWrapper from "./components/ContentWrapper";
import "./App.css";

const { Title, Text } = Typography;

const App = () => {
  const onClick = () => console.log("Clicked");

  return (
    <Page>
      <TitleWrapper>
        <Title level={2}>BlitzDev Challenge</Title>
      </TitleWrapper>
      <ContentWrapper>
        <Space direction="vertical" align="center" size="middle">
          <Text>
            React website based on Ant Design for solving BlitzDev Challenge
          </Text>
          <Button type="primary" onClick={onClick}>
            Try Me
          </Button>
        </Space>
      </ContentWrapper>
    </Page>
  );
};

export default App;
