import React from 'react';
import { Row, Col } from 'antd';
import { ProfileWrapper } from './Profile.styles';
const ProfileData = {
  name: 'Guest',
};
export default function ViewProfile(...props) {
  return (
    <>
      <ProfileWrapper>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 60]}>
          <Col span={24}>
            <h2>Basic information and experience</h2>
          </Col>
          <Col span={6}>
            <span className="label">Name</span>
          </Col>
          <Col span={6}>
            <span>{ProfileData.name}</span>
          </Col>

          <Col span={6}>
            <span className="label">Name</span>
          </Col>
          <Col span={6}>
            <span>{ProfileData.name}</span>
          </Col>
          <Col span={18}>
            <p className="ant-form-item">Where did you hear about Pepper?</p>
          </Col>
          <Col span={6}></Col>
          <Col span={24} style={{ float: 'right' }}></Col>
        </Row>
      </ProfileWrapper>
    </>
  );
}
