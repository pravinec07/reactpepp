import React, { Fragment } from 'react';
import { Form, Input, Row, Col, Button, Radio } from 'antd';

export default function Step1(props) {
  const { getFieldDecorator } = props.data.form;

  return (
    <Fragment>
      <Row gutter={24}>
        <Col xs={24} sm={12}>
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
        <Col xs={24} sm={12}>
          <Form.Item label="Your Name">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please input your name',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
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

        <Col xs={24} sm={12}>
          <Form.Item label="Contact Number">
            {getFieldDecorator('contactNum', {
              rules: [
                {
                  required: true,
                  message: 'Please input contact number',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Radio.Group>
            <Radio value={1}>
              I'm a Business- I need content for my company
            </Radio>
            <Radio value={2}>
              I'm an Agency- I need content for my clients
            </Radio>
            <Radio value={3}>
              I'm an individual- I need content for my website, social media
              channel, blogs, etc.
            </Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}
