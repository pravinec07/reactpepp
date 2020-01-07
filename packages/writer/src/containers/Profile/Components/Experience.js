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

function BasicInformation({ ...props }) {
  const { userData } = props;
  return (
    <Card
      type="inner"
      title="Experience"
      extra={
        <a href="#">
          <Icon type="edit" />
        </a>
      }
    >
      <Row>
        <Col span={24}>
          <p style={{ color: '#000000d9', marginTop: '10px' }}>
            {' '}
            Uploaded Samples
          </p>
        </Col>
        <Col span={18}>
          <hr />
          <p style={{ color: '#16224F', fontWeight: '600' }}>
            File1.docx -{' '}
            <span
              style={{
                color: '#adadad',
                fontSize: '12px',
                fontWeight: '400',
              }}
            >
              {' '}
              Uploaded on May 20, 2019
            </span>
          </p>
        </Col>
        <Col span={6}>
          <hr />
          <ButtonGroup>
            <Button>
              <Icon type="download" />
            </Button>
            <Button>
              <Icon type="delete" />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ marginTop: '3px' }}></Col>
        <Col span={18}>
          <p style={{ color: '#16224F', fontWeight: '600' }}>
            File2.docx -{' '}
            <span
              style={{
                color: '#adadad',
                fontSize: '12px',
                fontWeight: '400',
              }}
            >
              {' '}
              Uploaded on May 20, 2019
            </span>
          </p>
        </Col>
        <Col span={6}>
          <ButtonGroup>
            <Button>
              <Icon type="download" />
            </Button>
            <Button>
              <Icon type="delete" />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Expected Pay? (In Rupees per word)">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.expectedPay || NO_DATA.na}
            </p>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Previous writing experiences and skillsets.">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.writingSkillSet || NO_DATA.na}

              {/* <a href="">Read more..</a> */}
            </p>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label=" companies that you've worked for in the past">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.pastCompanies || NO_DATA.na}
              <span
                style={{
                  color: '#adadad',
                  fontSize: '12px',
                  fontWeight: '400',
                }}
              ></span>
            </p>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Profession you are in, apart from freelance writing">
            <p style={{ color: '#16224F', fontWeight: '600' }}>
              {userData.currentProfession || NO_DATA.na}
              {/* <a href="">Read more..</a> */}
            </p>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
}

export default BasicInformation;
