import React, { Fragment } from 'react';
import { Form, Input, Upload, Icon, Row, Col, Button, Select } from 'antd';

export default function CreateProjectForm(props) {
  const { handleSelectChange, onNext } = props.data;
  const { getFieldDecorator } = props.data.form;
  const { TextArea } = Input;
  const { Option } = Select;

  return (
    <Fragment>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Project Name">
            {getFieldDecorator('projectName', {
              rules: [
                {
                  required: true,
                  message: 'Please input name of Project',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Project Type">
            {getFieldDecorator('projectType', {
              rules: [
                {
                  required: true,
                  message: 'Please select project type!',
                  whitespace: true,
                },
              ],
            })(
              <Select
                placeholder="Select a option and change input text above"
                onChange={handleSelectChange}
              >
                <Option value="type1">Type 1</Option>
                <Option value="type2">Type 2</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Genre">
            {getFieldDecorator('genre', {
              rules: [
                {
                  required: true,
                  message: 'Please select genre!',
                  whitespace: true,
                },
              ],
            })(
              <Select
                placeholder="Select a option and change input text above"
                onChange={handleSelectChange}
              >
                <Option value="genre1">Type 1</Option>
                <Option value="genre2">Type 2</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Vertical">
            {getFieldDecorator('vertical', {
              rules: [
                {
                  required: true,
                  message: 'Please select vertical!',
                  whitespace: true,
                },
              ],
            })(
              <Select
                placeholder="Select a option and change input text above"
                onChange={handleSelectChange}
              >
                <Option value="vertical1">Vertical 1</Option>
                <Option value="vertical2">Vertical 2</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Experience Level">
            {getFieldDecorator('experienceLevel', {
              rules: [
                {
                  required: true,
                  message: 'Please select project type!',
                  whitespace: true,
                },
              ],
            })(
              <Select
                placeholder="Select a option and change input text above"
                onChange={handleSelectChange}
              >
                <Option value="level1">Level 1</Option>
                <Option value="level2">Level 2</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Language">
            {getFieldDecorator('language', {
              rules: [
                {
                  required: true,
                  message: 'Please select language!',
                  whitespace: true,
                },
              ],
            })(
              <Select
                placeholder="Select a option and change input text above"
                onChange={handleSelectChange}
              >
                <Option value="language1">Language 1</Option>
                <Option value="language2">Language 2</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Objective">
            {getFieldDecorator('objective', {
              rules: [
                {
                  required: true,
                  message: 'Please input objective',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Audience">
            {getFieldDecorator('audience', {
              rules: [
                {
                  required: true,
                  message: 'Please input audience',
                },
              ],
            })(<TextArea />)}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Upload Reference File">
            {getFieldDecorator('dragger', {
              valuePropName: 'fileList',
              // getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}
