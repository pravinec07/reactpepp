import React, { Fragment } from 'react';
import { Form, Input, Row, Col, Button, Radio } from 'antd';

export default function Step1(props) {
  const { getFieldDecorator } = props.data.form;
  const { handleRadioChange, handleNextBackAction } = props;

  return (
    <Fragment>
      <Row gutter={24}>
        <Col xs={24}>
          <Form.Item label="Company Name">
            {getFieldDecorator('companyName', {
              rules: [
                {
                  required: true,
                  message: 'Please input name of Company',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Your Name">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Please input your name',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Email Id">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Please input your email',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item label="Contact Number">
            {getFieldDecorator('phoneNumber', {
              rules: [
                {
                  required: true,
                  message: 'Please input contact number',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item label="Please identify yourself">
            {getFieldDecorator('identifyType', {
              rules: [
                {
                  required: true,
                  message: 'Please select one identity',
                },
              ],
            })(
              <Radio.Group
                name="identification"
                onChange={handleRadioChange}
                style={{}}
              >
                <Radio value={'business'}>
                  I'm a Business- I need content for my company
                </Radio>
                <Radio value={'agency'}>
                  I'm an Agency- I need content for my clients
                </Radio>
                <Radio value={'individual'}>
                  I'm an individual- I need content for my website,
                  <br /> social media channel, blogs, etc.
                </Radio>
              </Radio.Group>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => handleNextBackAction(+1)}
          >
            Next
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}
