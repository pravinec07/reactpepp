import React, { Fragment } from 'react';
import { Form, Input, InputNumber, Row, Col, Button, Radio } from 'antd';
import Select, { SelectOption } from '@iso/components/uielements/select';

export default function Step1(props) {
  const { getFieldDecorator } = props.data.form;
  const { handleRadioChange, identityType, handleNextBackAction } = props;
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '+91',
  })(
    <Select style={{ width: 70 }}>
      <SelectOption value="+91">+91</SelectOption>
    </Select>
  );
  return (
    <Fragment>
      <Row gutter={24}>
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
              <Radio.Group name="identification" onChange={handleRadioChange}>
                <Radio value={'business'}>Business</Radio>
                <Radio value={'agency'}>Agency</Radio>
                <Radio value={'individual'}>Individual</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        </Col>
        {identityType !== 'individual' && (
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
        )}
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
            })(<Input addonBefore={prefixSelector} />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            htmlType="button"
            onClick={handleNextBackAction}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}
