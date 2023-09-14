import React from 'react';
import { Button, Result } from 'antd';
const MobileHome = () => (
  <Result
    status="warning"
    title="Optimized for Larger Displays"
    subTitle="This website is designed for larger screens. Please use a device with a larger display for the best experience."
    extra={[
      <Button key="buy">try Again</Button>,
    ]}
  />
);
export default MobileHome;