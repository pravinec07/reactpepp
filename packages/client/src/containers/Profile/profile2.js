import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Card,
  Slider,
} from 'antd';
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const marks = {
  0: {
    label: <strong>Tropical</strong>,
  },
  100: {
    label: <strong>Promotional</strong>,
  },
};
const marks2 = {
  0: {
    label: <strong>Concise</strong>,
  },
  100: {
    label: <strong>Explanatory</strong>,
  },
};
const marks3 = {
  0: {
    label: <strong>Formal</strong>,
  },
  100: {
    label: <strong>Casual</strong>,
  },
};
const marks4 = {
  0: {
    label: <strong>Niche</strong>,
  },
  100: {
    label: <strong>Generic</strong>,
  },
};
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
  };
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
      autoCompleteResult = [
        '.com',
        '.org',
        '.net',
        '.org.in',
        '.co',
        'in',
        '.info',
      ].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '91',
    })(
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="76">+76</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    return (
      <>
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          style={{ padding: '0px 20px 20px 20px' }}
        >
          <Row gutter={12}>
            <Col span={5}></Col>
            <Col span={14}>
              <h2 style={{ margin: '10px 0px', textAlign: 'center' }}>
                Add Client Details
              </h2>
              <Card
                type="inner"
                title="Company Information"
                style={{ margin: '0px 0px' }}
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
                {/* <Form.Item label="Company Address">
                  {getFieldDecorator('companyName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Company Name!',
                      },
                    ],
                  })(<Input placeholder="Address Line 1" />)}
                </Form.Item>
                <Form.Item label="Address Line 2">
                  {getFieldDecorator('companyName', {})(
                    <Input placeholder="Address Line 2" />
                  )}
                </Form.Item>
                <Row>
                  <Col span={8}></Col>
                  <Col span={7}>
                    <Select
                      placeholder="State"
                      onChange={this.handleSelectChange}
                    >
                      <Option value=""></Option>
                      <Option value=""></Option>
                    </Select>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={7}>
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
                  <Col span={8}></Col>
                  <Col span={7}>
                    <Select
                      placeholder="Country"
                      onChange={this.handleSelectChange}
                    >
                      <Option value=""></Option>
                      <Option value=""></Option>
                    </Select>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={7}>
                    <Form.Item label="">
                      {getFieldDecorator('companyName', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input your Company Name!',
                          },
                        ],
                      })(
                        <Input
                          placeholder="Pincode"
                          style={{ width: '100%' }}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Company Phone">
                  {getFieldDecorator('phone', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your phone number!',
                      },
                    ],
                  })(
                    <Input
                      addonBefore={prefixSelector}
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item> */}
                <Form.Item label="Company Email">
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid Email!',
                      },
                      {
                        required: true,
                        message: 'Please input your Email!',
                      },
                    ],
                  })(<Input placeholder="Enter Email" />)}
                </Form.Item>
                <Form.Item label="Company Website">
                  {getFieldDecorator('website', {
                    rules: [
                      {
                        message: 'The input is not valid',
                      },
                      {
                        required: true,
                        message: 'Please enter your Website',
                      },
                    ],
                  })(<Input placeholder="Enter Website" />)}
                </Form.Item>
              </Card>
              <Card
                type="inner"
                title="Industry & Audience"
                style={{ margin: '20px 0px' }}
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
                      <Option value="Health and Medical">
                        Health and Medical
                      </Option>
                      <Option value="Business and Finance">
                        Business and Finance
                      </Option>
                      <Option value="Technical">Technical</Option>
                      <Option value="Deep Technical- AI/ML/IoT/Cybersecurity">
                        Deep Technical- AI/ML/IoT/Cybersecurity
                      </Option>
                      <Option value="Lifestyle and Fashion">
                        Lifestyle and Fashion
                      </Option>
                      <Option value="Food and Beverage/Nutrition">
                        Food and Beverage/Nutrition
                      </Option>
                      <Option value="News Content/Entertainment">
                        News Content/Entertainment
                      </Option>
                      <Option value="Travel and Hospitality">
                        Travel and Hospitality
                      </Option>
                      <Option value="Sports and Recreation">
                        Sports and Recreation
                      </Option>
                      <Option value="Real Estate">Real Estate</Option>
                      <Option value="Astrology and Spiritual">
                        Astrology and Spiritual
                      </Option>
                      <Option value="Generic">Generic</Option>
                      <Option value="Other">Other</Option>
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
                      <Option value="Health and Medical">
                        Health and Medical
                      </Option>
                      <Option value="Business and Finance">
                        Business and Finance
                      </Option>
                      <Option value="Technical">Technical</Option>
                      <Option value="Deep Technical- AI/ML/IoT/Cybersecurity">
                        Deep Technical- AI/ML/IoT/Cybersecurity
                      </Option>
                      <Option value="Lifestyle and Fashion">
                        Lifestyle and Fashion
                      </Option>
                      <Option value="Food and Beverage/Nutrition">
                        Food and Beverage/Nutrition
                      </Option>
                      <Option value="News Content/Entertainment">
                        News Content/Entertainment
                      </Option>
                      <Option value="Travel and Hospitality">
                        Travel and Hospitality
                      </Option>
                      <Option value="Sports and Recreation">
                        Sports and Recreation
                      </Option>
                      <Option value="Real Estate">Real Estate</Option>
                      <Option value="Astrology and Spiritual">
                        Astrology and Spiritual
                      </Option>
                      <Option value="Generic">Generic</Option>
                      <Option value="Other">Other</Option>
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
                <Form.Item label="Preferred Languages">
                  {getFieldDecorator('companyName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Company Name!',
                      },
                    ],
                  })(<Input placeholder="Enter Language Preferred" />)}
                </Form.Item>
                <Row>
                  <Col span={8}></Col>
                  <Col span={16}>
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={this.add}
                        style={{ width: '70%' }}
                      >
                        <Icon type="plus" /> Add more Language
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <Col span={8}> </Col>
                  <Col span={16}>
                    <p style={{ color: '#000000d9', fontSize: '14px' }}>
                      Tonality
                    </p>
                    <Slider
                      defaultValue={1}
                      min={1}
                      max={5}
                      marks={marks}
                      style={{ width: '90%' }}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <Col span={8}></Col>
                  <Col span={16}>
                    <Slider
                      defaultValue={1}
                      min={1}
                      max={5}
                      marks={marks2}
                      style={{ width: '90%' }}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <Col span={8}></Col>
                  <Col span={16}>
                    <Slider
                      defaultValue={1}
                      min={1}
                      max={5}
                      marks={marks3}
                      style={{ width: '90%' }}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <Col span={8}></Col>
                  <Col span={16}>
                    <Slider
                      defaultValue={1}
                      min={1}
                      max={5}
                      marks={marks4}
                      style={{ width: '90%' }}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col
                    span={24}
                    style={{ textAlign: 'center', margin: '20px 0px' }}
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={5}></Col>
          </Row>
        </Form>{' '}
      </>
    );
  }
}

const WrappedProfileForm = Form.create({ name: 'profile' })(ProfileForm);

export default WrappedProfileForm;
