import React from 'react';
import {
  Form,
  Input,
  Upload,
  Icon,
  Row,
  Col,
  Card,
  Checkbox,
  Button,
  Modal,
  message,
  Radio,
  Select,
  Collapse,
} from 'antd';
const { Panel } = Collapse;
const { Option } = Select;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
class ProfileForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'http://localhost:3054/static/media/user1.56a1f25e.png',
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };
  uploadButton = () => (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  render() {
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;
    const { previewVisible, previewImage, fileList } = this.state;

    return (
      <>
        <Form
          layout="vertical"
          onSubmit={this.handleSubmit}
          style={{ padding: '0px 20px 20px 20px' }}
        >
          <h2 style={{ margin: '10px 0px' }}>Edit Client Details</h2>
          <Row gutter={12}>
            <Col span={10}>
              <Card
                type="inner"
                title="Company Information"
                extra={
                  <a href="./my-profile">
                    <Icon type="close" />
                  </a>
                }
              >
                <Form.Item label="Company Name">
                  {getFieldDecorator('companyName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Company Name!',
                      },
                    ],
                  })(<Input placeholder="Enter Company Name" />)}
                </Form.Item>
                <Form.Item label="Company Email">
                  {getFieldDecorator('companyName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Company Name!',
                      },
                    ],
                  })(<Input placeholder="Enter Email" />)}
                </Form.Item>
                <Form.Item label="Company Website">
                  {getFieldDecorator('companyName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Company Name!',
                      },
                    ],
                  })(<Input placeholder="Enter Website" />)}
                </Form.Item>
              </Card>
            </Col>
            <Col span={10}>
              <Card
                type="inner"
                style={{ height: '304px' }}
                title="Industry & Audience"
                extra={
                  <a href="./my-profile">
                    <Icon type="close" />
                  </a>
                }
              >
                <Form.Item label="Primary Industry">
                  {getFieldDecorator('pIndustry', {
                    rules: [
                      { required: true, message: 'Please select your gender!' },
                    ],
                  })(
                    <Select
                      placeholder="Select Primary Industry"
                      onChange={this.handleSelectChange}
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
                <Form.Item label="Secondary Industry">
                  {getFieldDecorator('sIndustry', {
                    rules: [
                      { required: true, message: 'Please select your gender!' },
                    ],
                  })(
                    <Select
                      placeholder="Select Secondary Industry"
                      onChange={this.handleSelectChange}
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
                <Form.Item label="What are you looking for">
                  <Row>
                    <Col span={12}>
                      <Checkbox>Content Writer</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox>Graphic Designer</Checkbox>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Checkbox>Language Translators</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox>Video Maker</Checkbox>
                    </Col>
                  </Row>
                </Form.Item>
              </Card>
            </Col>
          </Row>
          {/*  */}
          <Row>
            <Col span={24} style={{ marginTop: '20px' }}></Col>
          </Row>
          <Row gutter={12}>
            <Col span={10}>
              <Card
                type="inner"
                title="Other Company Details"
                extra={
                  <a href="./my-profile">
                    <Icon type="close" />
                  </a>
                }
              >
                <Form.Item label="Company Name">
                  {getFieldDecorator('companyName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Company Name!',
                      },
                    ],
                  })(<Input placeholder="Company Name" />)}
                </Form.Item>
                <Form.Item label="Company Address">
                  {getFieldDecorator('companyName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Company Name!',
                      },
                    ],
                  })(<Input placeholder="Address Line 1" />)}
                </Form.Item>
                <Form.Item label="">
                  {getFieldDecorator('companyName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Company Name!',
                      },
                    ],
                  })(<Input placeholder="Address Line 2" />)}
                </Form.Item>
                <Form.Item
                  label=""
                  style={{ paddingBottom: '0px', marginBottom: '0px' }}
                >
                  <Row>
                    <Col span={11}>
                      <Select
                        placeholder="State"
                        onChange={this.handleSelectChange}
                      >
                        <Option value=""></Option>
                        <Option value=""></Option>
                      </Select>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                      <Select
                        placeholder="City"
                        onChange={this.handleSelectChange}
                      >
                        <Option value=""></Option>
                        <Option value=""></Option>
                      </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} style={{ marginTop: '12px' }}></Col>
                    <Col span={11}>
                      <Select
                        placeholder="Country"
                        onChange={this.handleSelectChange}
                      >
                        <Option value=""></Option>
                        <Option value=""></Option>
                      </Select>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                      <Form.Item label="">
                        {getFieldDecorator('companyName', {
                          rules: [
                            {
                              required: true,
                              message: 'Please input your Company Name!',
                            },
                          ],
                        })(<Input placeholder="Pincode" />)}
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label="Company Phone">
                  {getFieldDecorator('companyName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Company Name!',
                      },
                    ],
                  })(<Input placeholder="Enter Company Phone" />)}
                </Form.Item>
                <Form.Item label="Company GST">
                  {getFieldDecorator('companyName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Company Name!',
                      },
                    ],
                  })(<Input placeholder="Enter GST Details" />)}
                </Form.Item>
              </Card>
            </Col>
            <Col span={10}>
              <Card
                type="inner"
                title="POC Details"
                extra={
                  <a href="./my-profile">
                    <Icon type="close" />
                  </a>
                }
              >
                <Form.Item label="">
                  <Row>
                    <Col span={24}>
                      <Checkbox>I am the POC</Checkbox>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label="Name">
                  {getFieldDecorator('companyName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Company Name!',
                      },
                    ],
                  })(<Input placeholder="Enter POC Name" />)}
                </Form.Item>
                <Form.Item label="Email">
                  {getFieldDecorator('companyName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Company Name!',
                      },
                    ],
                  })(<Input placeholder="Enter POC Email" />)}
                </Form.Item>
                <Form.Item label="Phone">
                  {getFieldDecorator('companyName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Company Name!',
                      },
                    ],
                  })(<Input placeholder="Enter POC Phone" />)}
                </Form.Item>
                <Collapse accordion>
                  <Panel header="Add Alternate POC" key="1">
                    <Form.Item label="Alternate POC Name">
                      {getFieldDecorator('companyName', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input your Company Name!',
                          },
                        ],
                      })(<Input placeholder="Enter POC Name" />)}
                    </Form.Item>
                    <Form.Item label="Alternate POC Email">
                      {getFieldDecorator('companyName', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input your Company Name!',
                          },
                        ],
                      })(<Input placeholder="Enter POC Email" />)}
                    </Form.Item>
                    <Form.Item label="Alternate POC Phone">
                      {getFieldDecorator('companyName', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input your Company Name!',
                          },
                        ],
                      })(<Input placeholder="Enter POC Phone" />)}
                    </Form.Item>
                  </Panel>
                </Collapse>
              </Card>
            </Col>
          </Row>
        </Form>{' '}
      </>
    );
  }
}

const WrappedProfileForm = Form.create({ name: 'profile' })(ProfileForm);

export default WrappedProfileForm;
