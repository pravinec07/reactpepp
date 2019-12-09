import React, { Fragment } from 'react';
import {
  Form,
  Input,
  Upload,
  Icon,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Steps,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

class RegistrationForm extends React.Component {
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
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { Step } = Steps;
    const { TextArea } = Input;
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
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Fragment>
        <Steps
          size="small"
          current={1}
          style={{ padding: '50px 300px 0 300px' }}
        >
          <Step title="Create Project" />
          <Step title="Add Articles" />
        </Steps>
        <Form
          layout="vertical"
          onSubmit={this.handleSubmit}
          style={{ padding: '50px 100px' }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="No. Of Articles">
                {getFieldDecorator('numArticles', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input no. of Articles',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Article Topic">
                {getFieldDecorator('topic', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your topic!',
                      whitespace: true,
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Word Count">
                {getFieldDecorator('wordCount', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input word count',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Keyword">
                {getFieldDecorator('keyword', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input keyword',
                    },
                  ],
                })(<TextArea />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="References">
                {getFieldDecorator('references', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input References',
                    },
                  ],
                })(<TextArea />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Description">
                {getFieldDecorator('description', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input Description',
                    },
                  ],
                })(<TextArea />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{ float: 'right' }}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
              <hr />
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item>
                    <Button type="primary" htmlType="Download CSV">
                      Download CSV
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Dragger">
                    {getFieldDecorator('dragger', {
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile,
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
            </Col>
          </Row>
        </Form>
      </Fragment>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(
  RegistrationForm
);

export default WrappedRegistrationForm;
