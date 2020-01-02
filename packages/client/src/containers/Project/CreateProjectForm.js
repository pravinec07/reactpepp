import React, { Fragment } from 'react';
import {
  Form,
  Input,
  Upload,
  Icon,
  Row,
  Col,
  Button,
  Select,
  Card,
} from 'antd';

export default function CreateProjectForm(props) {
  const { handleSelectChange, onNext } = props.data;
  const { getFieldDecorator } = props.data.form;
  const { TextArea } = Input;
  const { Option } = Select;
  const prop = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  };
  return (
    <Fragment>
      <Row>
        <Col span={3}></Col>
        <Col span={18}>
          <Card
            type="inner"
            title="Create Project"
            style={{ marginBottom: '20px' }}
          >
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
                      <Option value="One Time">One Time</Option>
                      <Option value="Recurring">Recurring</Option>
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
                      <option value="Health and Medical">
                        Health and Medical
                      </option>
                      <option value="Business and Finance">
                        Business and Finance
                      </option>
                      <option value="Technical">Technical</option>
                      <option value="Deep Technical- AI/ML/IoT/Cybersecurity">
                        Deep Technical- AI/ML/IoT/Cybersecurity
                      </option>
                      <option value="Lifestyle and Fashion">
                        Lifestyle and Fashion
                      </option>
                      <option value="Nutrition/ Food and Beverage">
                        Nutrition/ Food and Beverage
                      </option>
                      <option value="News Content and/or Entertainment">
                        News Content and/or Entertainment
                      </option>
                      <option value="Travel and Hospitality">
                        Travel and Hospitality
                      </option>
                      <option value="Sports and Recreation">
                        Sports and Recreation
                      </option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Family-Parenting/Childcare">
                        Family-Parenting/Childcare
                      </option>
                      <option value="Opinionated and Engaging Content">
                        Opinionated and Engaging Content
                      </option>
                      <option value="Education">Education</option>
                      <option value="Astrology and Spiritual">
                        Astrology and Spiritual
                      </option>
                      <option value="Generic">Generic</option>
                      <option value="Other">Other</option>
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
                      <option value="Blogs and Articles">
                        Blogs and Articles
                      </option>
                      <option value="Website Content">Website Content</option>
                      <option value="Academic/Book Writing">
                        Academic/Book Writing
                      </option>
                      <option value="Press Releases">Press Releases</option>
                      <option value="White Papers">White Papers</option>
                      <option value="Branded Content">Branded Content</option>
                      <option value="Copywriting">Copywriting</option>
                      <option value="Social Media- LinkedIn">
                        Social Media- LinkedIn
                      </option>
                      <option value="Social Media- Facebook">
                        Social Media- Facebook
                      </option>
                      <option value="Social Media- Twitter">
                        Social Media- Twitter
                      </option>
                      <option value="Social Media- Instagram">
                        Social Media- Instagram
                      </option>
                      <option value="Product Descriptions and Reviews">
                        Product Descriptions and Reviews
                      </option>
                      <option value="Corporate Communications Content">
                        Corporate Communications Content
                      </option>
                      <option value="Technical Content Writing- Manuals, Software Testing Guides">
                        Technical Content Writing- Manuals, Software Testing
                        Guides
                      </option>
                      <option value="Others">Others</option>
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
                      <Option value="Intermediate">Intermediate</Option>
                      <Option value="Advance">Advance</Option>
                      <Option value="Expert">Expert</Option>
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
                      <Option value="Hindi">Hindi</Option>
                      <Option value="Tamil">Tamil</Option>
                      <Option value="Telugu">Telugu</Option>
                      <Option value="Urdu">Urdu</Option>
                      <Option value="Kannada">Kannada</Option>
                      <Option value="Malayalam">Malayalam</Option>
                      <Option value="Gujarati">Gujarati</Option>
                      <Option value="Marathi">Marathi</Option>
                      <Option value="Punjabi">Punjabi</Option>
                      <Option value="Bangla">Bangla</Option>
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
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Upload Reference File">
                  {getFieldDecorator('dragger', {
                    valuePropName: 'fileList',
                    // getValueFromEvent: this.normFile,
                  })(
                    <Upload {...prop}>
                      <Button>
                        <Icon type="upload" /> Click to Upload
                      </Button>
                    </Upload>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col
                span={24}
                style={{ textAlign: 'center', margin: '15px 0px' }}
              >
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={3}></Col>
      </Row>
    </Fragment>
  );
}
