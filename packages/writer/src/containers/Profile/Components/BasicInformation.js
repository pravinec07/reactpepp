import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Row, Col, Card, Button, Checkbox, Collapse } from 'antd';
import Upload from '@iso/components/uielements/upload';
import Input, { Textarea } from '@iso/components/uielements/input';
// import Button from "@iso/components/uielements/button";
// import Checkbox from "@iso/components/uielements/checkbox";
import message from '@iso/components/uielements/message';
import Modal from '@iso/components/uielements/modal';
import Radio from '@iso/components/uielements/radio';
import Form from '@iso/components/uielements/form';
import Select, { SelectOption } from '@iso/components/uielements/select';

import Notification from '@iso/components/Notification';
import userActions from '../../../redux/user/actions';
import {
  GENRE,
  VERTICAL,
  PAY_RANGE,
  POSITION_SOURCE,
  LANGUAGE,
  DAYS,
  NO_DATA,
} from '../../../config/Constants';
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
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState(props.userData);
  const { getFieldDecorator } = props.form;
  function editChange() {
    setIsEdit(!isEdit);
    setUserData(props.userData);
  }
  useEffect(() => {
    setUserData(props.userData);
  }, [props.userData]);
  return (
    <Card
      type="inner"
      title="Basic Information"
      extra={
        <div>
          {isEdit ? (
            [
              <Button>Save</Button>,
              <Icon onClick={() => editChange()} type="close" />,
            ]
          ) : (
            <Icon onClick={() => editChange()} type="edit" />
          )}
        </div>
      }
    >
      <Row>
        <Col span={12}>
          <Form.Item label="Most Prefered Genre">
            {isEdit ? (
              getFieldDecorator('genre1', {
                rules: [
                  {
                    required: true,
                    message: 'Please select your Most Prefered Genre.',
                  },
                ],
                initialValue: userData.genre1,
              })(
                <Select
                  showSearch
                  placeholder="Select a Genre"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {GENRE.map((item, index) => (
                    <SelectOption key={`genreone${index}`} value={item.value}>
                      {item.label}
                    </SelectOption>
                  ))}
                </Select>
              )
            ) : (
              <p style={{ color: '#16224F', fontWeight: '600' }}>
                {userData.genre1 || NO_DATA.na}
              </p>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Second Most Prefered Genre">
            {isEdit ? (
              getFieldDecorator('genre2', {
                rules: [
                  {
                    required: true,
                    message: 'Please select your Most Prefered Genre.',
                  },
                ],
                initialValue: userData.genre2,
              })(
                <Select
                  showSearch
                  placeholder="Select a Genre"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {GENRE.map((item, index) => (
                    <SelectOption key={`genreone${index}`} value={item.value}>
                      {item.label}
                    </SelectOption>
                  ))}
                </Select>
              )
            ) : (
              <p style={{ color: '#16224F', fontWeight: '600' }}>
                {userData.genre2 || NO_DATA.na}
              </p>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="Most Prefered Vertical">
            {isEdit ? (
              getFieldDecorator('vertical1', {
                rules: [
                  {
                    required: true,
                    message: 'Please select your Most Prefered Genre.',
                  },
                ],
                initialValue: userData.vertical1,
              })(
                <Select
                  showSearch
                  placeholder="Select a Vertical"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {VERTICAL.map((item, index) => (
                    <SelectOption key={`genreone${index}`} value={item.value}>
                      {item.label}
                    </SelectOption>
                  ))}
                </Select>
              )
            ) : (
              <p style={{ color: '#16224F', fontWeight: '600' }}>
                {userData.vertical1 || NO_DATA.na}
              </p>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Second Most Prefered Vertical">
            {isEdit ? (
              getFieldDecorator('vertical2', {
                rules: [
                  {
                    required: true,
                    message: 'Please select your Most Prefered Genre.',
                  },
                ],
                initialValue: userData.vertical2,
              })(
                <Select
                  showSearch
                  placeholder="Select a Vertical"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {VERTICAL.map((item, index) => (
                    <SelectOption key={`genreone${index}`} value={item.value}>
                      {item.label}
                    </SelectOption>
                  ))}
                </Select>
              )
            ) : (
              <p style={{ color: '#16224F', fontWeight: '600' }}>
                {userData.vertical2 || NO_DATA.na}
              </p>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <p style={{ color: '#000000d9' }}> Uploaded CV</p>
        </Col>
        <Col span={18}>
          <hr />
          <p style={{ color: '#16224F', fontWeight: '600' }}>
            resume.docx -{' '}
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
        <Col span={24}>
          <p
            style={{
              color: '#000000d9',
              marginBottom: '10px',
              marginTop: '12px',
            }}
          >
            Languages you are proficient in
          </p>
        </Col>
      </Row>
      {isEdit ? (
        <Form.Items>
          {getFieldDecorator('languages', {
            valuePropName: 'defaultValue',
            rules: [
              {
                required: true,
                message: 'Please select languages.',
              },
            ],
            initialValue: (userData.languages || []).map(item =>
              (item || '').replace(/^\s+/g, '')
            ),
          })(<Checkbox.Group options={LANGUAGE} />)}
        </Form.Items>
      ) : (
        (userData.languages || []).map((item, key) => (
          <Col key={`language${key}`} span={12}>
            <Checkbox checked>{item}</Checkbox>
          </Col>
        ))
      )}
    </Card>
  );
}

export default BasicInformation;
