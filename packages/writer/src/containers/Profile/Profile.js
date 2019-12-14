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
  Modal,
  message,
  Radio,
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
      <Fragment>
        <Form
          layout="vertical"
          onSubmit={this.handleSubmit}
          style={{ padding: '50px 100px' }}
        >
          <Row gutter={24}>
            <Col span={24}>
              <h2>Complete Writer Details</h2>
            </Col>
            <Col span={12}>
              <p>Upload Picture</p>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 1 ? null : this.uploadButton()}
              </Upload>
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={previewImage}
                />
              </Modal>
            </Col>
            <Col span={12}>
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
            <Col span={12}>
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
          </Row>
          <Row gutter={24}>
            <Col span={24}></Col>
            <Col span={6}>
              <p className="ant-form-item">Weekday Availability:</p>
            </Col>
            <Col span={18}>
              <Checkbox>Mon</Checkbox>
              <Checkbox>Tue</Checkbox>
              <Checkbox>Wed</Checkbox>
              <Checkbox>Thu</Checkbox>
              <Checkbox>Fri</Checkbox>
              <Checkbox>Sat</Checkbox>
              <Checkbox>Sun</Checkbox>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}></Col>
            <Col span={6}>
              <p className="ant-form-item">Daily Word Count:</p>
            </Col>
            <Col span={12}>
              <Form.Item label="">
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
            <Col span={24}></Col>
            <Col span={6}>
              <p className="ant-form-item">Writer</p>
            </Col>
            <Col span={18}>
              <Radio.Group onChange={null}>
                <Radio value={1}>Full Time</Radio>
                <Radio value={2}>Part Time</Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}></Col>
            <Col span={6}>
              <p className="ant-form-item">Freelancer</p>
            </Col>
            <Col span={18}>
              <Radio.Group onChange={null}>
                <Radio value={1}>Full Time</Radio>
                <Radio value={2}>Part Time</Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}></Col>
            <Col span={6}>
              <p className="ant-form-item">Perferred Payment Options:</p>
            </Col>
            <Col span={18}>
              <Checkbox>Account transfer</Checkbox>
              <Checkbox>Cheque</Checkbox>
              <Checkbox>Paytm</Checkbox>
              <Checkbox>Google Pay</Checkbox>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <h2>Bank Details</h2>
            </Col>
            <Col span={12}>
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
            <Col span={12}>
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
            <Col span={12}>
              <Form.Item label="Bank Name">
                {getFieldDecorator('bankName', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter bank name.',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
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
            <Col span={12}>
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
            <Col span={24}>
              <Checkbox>I accept the terms and conditions.</Checkbox>
            </Col>
            <Col span={24} style={{ float: 'right' }}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
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
