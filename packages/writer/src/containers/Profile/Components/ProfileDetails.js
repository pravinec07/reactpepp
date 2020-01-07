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
import userActions from '../../../redux/user/actions';
import { DAYS, NO_DATA } from '../../../config/Constants';
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

function ProfileDetails({ ...props }) {
  const { userData } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  const handleChange = () => {};
  // onChange(info) {
  //   if (info.file.status !== "uploading") {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === "done") {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === "error") {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // }
  const uploadButton = () => (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <Card
      type="inner"
      title="Profile Details"
      extra={
        <a href="#">
          <Icon type="edit" />
        </a>
      }
    >
      <Row>
        <Col span={7}>
          <p
            className="ant-form-item"
            style={{ marginBottom: '0px', fontWeight: '600' }}
          >
            Upload Photo
          </p>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            // fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {uploadButton()}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Col>
        <Col span={8}>
          <Form.Item label="First Name">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.name || NO_DATA.na} {userData.lastname || NO_DATA.na}
            </p>
          </Form.Item>
          <Form.Item label="Phone">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.phoneNumber || NO_DATA.na}
            </p>
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item label="Last Name">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.lastname || NO_DATA.na}
            </p>
          </Form.Item>
          <Form.Item label="Email">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.email || NO_DATA.na}
            </p>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}></Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="Occupation">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.occupation || NO_DATA.na}
            </p>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Daily Word Count">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.dailyWordCount || NO_DATA.na} WPD
            </p>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {' '}
          <p style={{ color: '#000000a6', marginBottom: '10px' }}>
            Weekday Availability
          </p>
        </Col>
        {(userData.availability || []).map((item, key) => (
          <Col key={`availablity${key}`} span={6}>
            <Checkbox
              value={item}
              checked
              style={{ color: '#16224F', fontWeight: '600' }}
            >
              {item}
            </Checkbox>
          </Col>
        ))}
      </Row>
      <Row>
        <Col span={24} style={{ marginTop: '10px' }}></Col>
        <Col span={5}>
          <p className="ant-form-item" style={{ marginBottom: '0px' }}>
            Writer
          </p>
        </Col>
        <Col span={7}>
          <Radio.Group
            onChange={null}
            style={{ color: '#16224F', fontWeight: '600' }}
          >
            <Radio value={1} checked>
              {userData.writer || NO_DATA.na}
            </Radio>
          </Radio.Group>
        </Col>
        <Col span={5}>
          <p className="ant-form-item" style={{ marginBottom: '0px' }}>
            Freelancer
          </p>
        </Col>
        <Col span={7}>
          <Radio.Group
            onChange={null}
            style={{ color: '#16224F', fontWeight: '600' }}
          >
            <Radio value={1} checked>
              {userData.freelancer || NO_DATA.na}
            </Radio>
          </Radio.Group>
        </Col>
      </Row>
    </Card>
  );
}

export default ProfileDetails;
