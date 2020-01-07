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

function BankDetails({ ...props }) {
  const { userData } = props;
  return (
    <Card
      type="inner"
      title="Bank Details"
      extra={
        <a href="#">
          <Icon type="edit" />
        </a>
      }
    >
      <Row>
        <Col span={24} style={{ marginTop: '10px' }}></Col>
        <Col span={12}>
          <Form.Item label="A/c Number">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.accountNumber || NO_DATA.na}
            </p>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="A/c Holder Name">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.accountHolder || NO_DATA.na}
            </p>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="Bank Name">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.bankName || NO_DATA.na}
            </p>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Branch Name">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.branchName || NO_DATA.na}
            </p>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="IFSC Code">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.ifscCode || NO_DATA.na}
            </p>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="PAN Card">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.pancard || NO_DATA.na}
            </p>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
}

export default BankDetails;
