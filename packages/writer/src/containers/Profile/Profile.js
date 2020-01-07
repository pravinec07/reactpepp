import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Row, Col, Card, Button, Select, Collapse } from 'antd';
import Upload from '@iso/components/uielements/upload';
import Input, { Textarea } from '@iso/components/uielements/input';
// import Button from "@iso/components/uielements/button";
import Checkbox from '@iso/components/uielements/checkbox';
import message from '@iso/components/uielements/message';
import Modal from '@iso/components/uielements/modal';
import Radio from '@iso/components/uielements/radio';
import Form from '@iso/components/uielements/form';
import Notification from '@iso/components/Notification';

import userActions from '../../redux/user/actions';
import { DAYS, NO_DATA } from '../../config/Constants';
import BasicInfromation from './Components/BasicInformation';
import ProfileDetails from './Components/ProfileDetails';
import Experience from './Components/Experience';
import BankDetails from './Components/BankDetails';

const { Panel } = Collapse;
const { Option } = Select;
const ButtonGroup = Button.Group;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
function Profile({ ...props }) {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const Auth = useSelector(state => state.Auth);
  const {
    getProfileLoading,
    getProfileResponse,
    getProfileError,
  } = useSelector(state => state.User);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch();
        // updateProfileStart({
        //   ...values,
        //   accessToken: Auth.idToken.sessionToken,
        // })
      }
    });
  };
  useEffect(() => {
    dispatch(
      userActions.getProfileStart({
        username: Auth.idToken.userData.email,
        accessToken: Auth.idToken.sessionToken,
      })
    );
  }, []);
  useEffect(() => {
    if (getProfileLoading !== null) {
      if (!getProfileLoading && !getProfileError) {
        setUserData(getProfileResponse);
      } else if (getProfileError) {
        Notification('error', 'Error in Get Profile deatils', getProfileError);
      }
    }
  }, [getProfileLoading, getProfileResponse, getProfileError]);

  return (
    <>
      <Form
        layout="vertical"
        onSubmit={handleSubmit}
        style={{ padding: '0px 20px 20px 20px' }}
      >
        <h2 style={{ margin: '10px 0px' }}>Writer Details</h2>
        <Row gutter={12}>
          <Col span={11}>
            <BasicInfromation userData={userData} form={props.form} />
          </Col>
          <Col span={11}>
            <ProfileDetails userData={userData} form={props.form} />
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ marginTop: '20px' }}></Col>
        </Row>
        <Row gutter={12}>
          <Col span={11}>
            <Experience userData={userData} form={props.form} />
          </Col>
          <Col span={11}>
            <BankDetails userData={userData} form={props.form} />
          </Col>
        </Row>
      </Form>
    </>
  );
}

const WrappedProfile = Form.create({ name: 'profile' })(Profile);

export default WrappedProfile;
