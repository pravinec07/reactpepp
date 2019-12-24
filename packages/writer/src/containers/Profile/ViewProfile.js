import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { ProfileWrapper } from './Profile.styles';
const ProfileData = {
  name: 'Guest',
};
export default function ViewProfile(...props) {
  const { profile } = useSelector(state => state.Auth);
  console.log(profile, '------>');
  return (
    <>
      <ProfileWrapper>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 60]}>
          <Col span={24}>
            <h2>Basic information and experience</h2>
          </Col>
          <Col span={6}>
            <span className="label">First Name</span>
          </Col>
          <Col span={6}>
            <span>{profile && profile.userData && profile.userData.name}</span>
          </Col>

          <Col span={6}>
            <span className="label">Last Name</span>
          </Col>
          <Col span={6}>
            <span>
              {profile && profile.userData && profile.userData.lastname}
            </span>
          </Col>
          <Col span={6}>
            <span className="label">Email Name</span>
          </Col>
          <Col span={6}>
            <span>{profile && profile.userData && profile.userData.email}</span>
          </Col>

          <Col span={6}>
            <span className="label">Phone Number</span>
          </Col>
          <Col span={6}>
            <span>
              {profile && profile.userData && profile.userData.phoneNumber}
            </span>
          </Col>
          <Col span={18}>
            {/* <p className="ant-form-item">Where did you hear about Pepper?</p> */}
          </Col>
          <Col span={6}></Col>
          <Col span={24} style={{ float: 'right' }}></Col>
        </Row>
      </ProfileWrapper>
    </>
  );
}
