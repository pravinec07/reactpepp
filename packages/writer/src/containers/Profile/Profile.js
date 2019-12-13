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
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;

    return (
      <Fragment>
        <Form
          layout="vertical"
          onSubmit={this.handleSubmit}
          style={{ padding: '50px 100px' }}
        >
          <h2>Complete Writer Details</h2>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Description">
                {getFieldDecorator('description', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter description',
                    },
                  ],
                })(<TextArea />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Occupation">
                {getFieldDecorator('occupation', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter occupation',
                      whitespace: true,
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Daily Word Count">
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
          </Row>
          <Row gutter={24}>
            <h2>Bank Details</h2>
            <Col span={24}>
              <Form.Item label="A/c Number">
                {getFieldDecorator('accNumber', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter A/c number',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="A/c Number">
                {getFieldDecorator('accNumber', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter A/c number',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="A/c Name">
                {getFieldDecorator('accName', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter A/c Name',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Branch Name">
                {getFieldDecorator('branchName', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter branch name',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="IFSC code">
                {getFieldDecorator('ifscCode', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter IFSC code',
                    },
                  ],
                })(<Input />)}
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
            </Col>
          </Row>
        </Form>
      </Fragment>
    );
  }
}

const WrappedProfileForm = Form.create({ name: 'profile' })(ProfileForm);

export default WrappedProfileForm;
