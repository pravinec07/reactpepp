import React, { Fragment } from 'react';
import { Form, Input, Row, Col, Button, Radio, Select } from 'antd';

export default function Step2(props) {
  const { getFieldDecorator } = props.data.form;
  const { TextArea } = Input;
  const { Option } = Select;
  const { handleSelectChange } = props.data;

  return (
    <Fragment>
      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio value={1}>Health and Medical</Radio>
            <Radio value={2}>Business and Finance</Radio>
            <Radio value={3}>Technical</Radio>
            <Radio value={4}>Deep Technical- AI/ML/IoT/Cybersecurity</Radio>
            <Radio value={3}>Lifestyle and Fashion</Radio>
            <Radio value={3}>Food and Beverage/Nutrition</Radio>
            <Radio value={3}>News Content/Entertainment</Radio>
            <Radio value={3}>Travel and Hospitality</Radio>
            <Radio value={3}>Sports and Recreation</Radio>
            <Radio value={3}>Real Estate</Radio>
            <Radio value={3}>Astrology and Spiritual</Radio>{' '}
            <Radio value={3}>Generic</Radio> <Radio value={3}>Other</Radio>
          </Radio.Group>
        </Col>
        <Col xs={24} sm={12}>
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio value={1}>Yes</Radio>
            <Radio value={2}>No</Radio>
          </Radio.Group>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="Volume of content pieces per month?">
            {getFieldDecorator('volume', {
              rules: [
                {
                  required: true,
                  message: 'Please select volume',
                  whitespace: true,
                },
              ],
            })(
              <Select placeholder="-Select-" onChange={handleSelectChange}>
                <Option value="type1">1-10</Option>
                <Option value="type2">10-20</Option>
                <Option value="type2">20-40</Option>
                <Option value="type2">40-70</Option>
                <Option value="type2">70-100</Option>
                <Option value="type2">>100</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="Estimated monthly budget on content?(INR)">
            {getFieldDecorator('budget', {
              rules: [
                {
                  required: true,
                  message: 'Please select Budget',
                  whitespace: true,
                },
              ],
            })(
              <Select placeholder="-Select-" onChange={handleSelectChange}>
                <Option value="type1">15,000-35,000</Option>
                <Option value="type2">35,000-1,00,000</Option>
                <Option value="type2">1,00,000-4,00,000</Option>
                <Option value="type2">4,00,000-10,00,000</Option>
                <Option value="type2">>10,00,000</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="Could you tell us a bit about your online presence?(Website URL, Social Media URL or anything other you would like us to know.)">
            {getFieldDecorator('url', {
              rules: [
                {
                  required: true,
                  message: 'Please input Url',
                },
              ],
            })(<TextArea />)}
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="Any Message or requirements you would like us to know of?">
            {getFieldDecorator('message', {
              rules: [
                {
                  required: true,
                  message: 'Please input Message',
                },
              ],
            })(<TextArea />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={12} sm={24} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={props.handleback}>
            Back
          </Button>
        </Col>
        <Col xs={12} sm={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}
